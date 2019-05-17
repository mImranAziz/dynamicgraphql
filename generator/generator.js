const jsonSchema1 = require('./odata/api-model-schema-one.json');
const jsonSchema2 = require('./odata/api-model-schema-two.json');

const graphSchemaBuilder = require('./graphSchemaBuilder');
const graphResolverBuilder = require('./graphResolverBuilder');
const graphMutationBuilder = require('./graphMutationBuilder');
const { buildSchema } = require('graphql');


module.exports = (schemaModel) => {
    const schemaWrapper = graphSchemaBuilder(schemaModel == 'tenant1' ? jsonSchema1 : jsonSchema2);
    const root = Object.assign({}, graphResolverBuilder(schemaWrapper.resolversDescriptor), graphMutationBuilder(schemaWrapper.mutationsDescriptor));

    return {
        rawSchema: schemaWrapper.rawSchema,
        schema: buildSchema(schemaWrapper.rawSchema),
        root
    }
};