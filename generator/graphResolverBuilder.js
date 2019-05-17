const fetch = require('isomorphic-fetch');

const credentials = require('./credentials');

const getList = async (endPoint) => {
    if(!endPoint) {
        console.error('No Endpoint was provided');
        return null;
    }
        
    const list = await fetch(endPoint, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Authorization': credentials.basicAuth,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
    
    return list.value;
}

const getById = async (endPoint, input) => {
    const list = await getList(endPoint);
    return list.find(record => record.Id == input.id)
};

const generateResolver = (descriptor) => {
    switch(descriptor.type) {
        case 'listQuery':
            return () => getList(descriptor.endPoint);

        case 'byIdQuery':
            return (objectId) => getById(descriptor.endPoint, objectId);
    }
}

const buildResolvers = resolversDescriptor => {
    let resolvers = {};
    
    resolversDescriptor.forEach(descriptor => {
        resolvers[descriptor.name] = generateResolver(descriptor);
    })

    return resolvers;
}

module.exports = resolversDescriptor => buildResolvers(resolversDescriptor);