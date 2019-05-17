const createMutator = (inputObject, endPoint) => {
    const input = inputObject.input;
    console.log('Not implemented yet', JSON.stringify(input));
    return input;
}

const deleteMutator = (id, endPoint) => {
    console.log('Not implemented yet', id);
    return 'Deleted ' + id;
}

const updateMutator = (inputObject, endPoint) => {
    console.log('Not implemented yet');
    return {
        rating: 99,
        id: 1,
        show: 'sample updated show'
    };
}

const generateMutator = (descriptor) => {
    switch (descriptor.type) {
        case 'delete':
            return (inputObject) => deleteMutator(inputObject.id, descriptor.endPoint);
        case 'create':
            return (inputObject) => createMutator(inputObject.input, descriptor.endPoint);
        case 'update':
            return (inputObject) => updateMutator(inputObject.input, descriptor.endPoint);
    }
}

const buildMutators = (mutationsDescriptor) => {
    let mutators = {};

    mutationsDescriptor.forEach(descriptor => {
        mutators[descriptor.name] = generateMutator(descriptor);
    })

    return mutators;
}

module.exports = mutationsDescriptor => buildMutators(mutationsDescriptor);