const buildSchemaForFields = fieldsList => fieldsList.map(field => generateGraphField(field)).join('\n');

const sanitizeFieldName = fieldName => fieldName.replace(/[@.]/g, '');

const generateGraphField = field => {
    const fieldName = sanitizeFieldName(field.name);
    return `${fieldName}: ${field.type}${(field.required ? '!' : '')}`;
}

const generateListResolverName = jsonSchema => `${jsonSchema.schemaName}List`;
const generateByIdResolverName = jsonSchema => `${jsonSchema.schemaName}ById`;
const generateDeleteMutationName = jsonSchema => `${jsonSchema.schemaName}_Delete`;
const generateUpdateMutationName = jsonSchema => `${jsonSchema.schemaName}_Update`;
const generateCreateMutationName = jsonSchema => `${jsonSchema.schemaName}_Create`;
const getTypeName = jsonSchema => jsonSchema.schemaName

const schemaTypeBuilder = (jsonSchema, isInputType = false) => {
    const customFields = buildSchemaForFields(jsonSchema.customFields);
    const commonFields = buildSchemaForFields(jsonSchema.commonFields);

    const typeName = (isInputType ? 'input ' : 'type ') + getTypeName(jsonSchema) + (isInputType ? 'Input' : '');

    return `${ typeName } {
            ${ customFields }\n${ commonFields }
}`
};

const schemaQueryBuilder = jsonSchema => {
    return `type Query {
    ${ generateListResolverName(jsonSchema) }: [${ jsonSchema.schemaName }]
${ generateByIdResolverName(jsonSchema) } (id: String!): ${ jsonSchema.schemaName }
}`;
};

const schemaMutationBuilder = jsonSchema => {
    return `type Mutation {
    ${ generateDeleteMutationName(jsonSchema) } (id: String): String
    ${ generateUpdateMutationName(jsonSchema) } (input: ${ getTypeName(jsonSchema)}Input): ${ getTypeName(jsonSchema) }
${ generateCreateMutationName(jsonSchema) } (input: ${ getTypeName(jsonSchema)}Input): ${ getTypeName(jsonSchema) }
}`;
}

const getDefaultResolvers = jsonSchema => {
    return [{
        name: generateListResolverName(jsonSchema),
        type: 'listQuery',
        endPoint: jsonSchema['@odata.context']
    }, {
        name: generateByIdResolverName(jsonSchema),
        type: 'byIdQuery',
        endPoint: jsonSchema['@odata.context']
    }];
}

const getDefaultMutations = jsonSchema => {
    return [{
        name: generateCreateMutationName(jsonSchema),
        type: 'create',
        endPoint: jsonSchema['@odata.context']
    },
    {
        name: generateDeleteMutationName(jsonSchema),
        type: 'delete',
        endPoint: jsonSchema['@odata.context']
    },
    {
        name: generateUpdateMutationName(jsonSchema),
        type: 'update',
        endPoint: jsonSchema['@odata.context']
    }]
}


module.exports = (jsonSchema) => {
    return {
        rawSchema: `${ schemaTypeBuilder(jsonSchema) } \n${ schemaTypeBuilder(jsonSchema, true) } \n${ schemaQueryBuilder(jsonSchema) } \n ${ schemaMutationBuilder(jsonSchema) } `,
        resolversDescriptor: getDefaultResolvers(jsonSchema),
        mutationsDescriptor: getDefaultMutations(jsonSchema)
    };
}