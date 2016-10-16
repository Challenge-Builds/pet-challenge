'use strict';
const namespace = 'petfinder';

function createStandardMethod(prefix, method) {
    return {
        name: `${prefix}.${method.name}`,
        method: method,
        options: {
            callback: false
        }
    };
}

function buildQueryOptions(method, options) {
    const APIBaseUrl = process.env.BASE_URL;
    var query = {
        uri: `${APIBaseUrl}${method}`,
        qs: {
            key: process.env.API_KEY,
            format: 'json'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    if (options) {
        // Loop through the request query and add to the api query
        Object.keys(options).forEach(key => query.qs[key] = options[key]);
    }

    return query
}

function cleanUpData(pet) {
    const indicator ='$t';
    pet.name = pet.name[indicator];
    pet.animal = pet.animal[indicator];
    pet.breed = pet.breeds.breed[indicator];
    pet.media = pet.media.photos.photo.filter(img => {
        if (img[indicator].includes('width=300')) {
            return img[indicator];
        }
    }).map(img => img[indicator]);
    return pet;
}

module.exports = {
    namespace: namespace,
    createStandardMethod: createStandardMethod,
    createNamespaceMethod: createStandardMethod.bind(null, namespace),
    buildQueryOptions: buildQueryOptions,
    cleanUpData: cleanUpData
};