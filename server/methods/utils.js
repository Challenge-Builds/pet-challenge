'use strict';
const namespace = 'petfinder';
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const md5 = require('md5');

function createStandardMethod(prefix, method) {
    return {
        name: `${prefix}.${method.name}`,
        method: method,
        options: {
            callback: false
        }
    };
}

function buildAuthOptions() {
    return buildQueryOptions('auth.getToken', {sig: md5(`${secret}key=${key}&format=json`)});
}

function buildQueryOptions(method, options) {
    const APIBaseUrl = process.env.BASE_URL;
    var query = {
        uri: `${APIBaseUrl}${method}`,
        qs: {
            key: key,
            format: 'json'
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json: true
    };

    if (options) {
        // Loop through the request query and add to the api query
        Object.keys(options).forEach(key => {
            query.qs[key] = typeof options[key] === 'string' ? options[key].toLowerCase() : options[key];
        });
    }

    return query
}

function cleanUpData(pet) {
    const indicator ='$t';
    pet.name = pet.name[indicator];
    pet.animal = pet.animal[indicator];
    pet.breed = pet.breeds.breed[indicator];
    pet.description = pet.description[indicator];
    pet.phone = pet.contact.phone[indicator];
    pet.city = pet.contact.city[indicator];
    pet.sex = pet.sex[indicator];
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
    buildAuthOptions: buildAuthOptions,
    buildQueryOptions: buildQueryOptions,
    cleanUpData: cleanUpData
};