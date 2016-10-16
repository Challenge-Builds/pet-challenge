'use strict';

const servicePath = process.env.SERVICE_PATH;

exports.routes = [];

// exports.routes.push({
//     path: `${servicePath}/auth`,
//     method: 'GET',
//     config: {
//         description: 'Authenticate to Petfinder API',
//         tags: ['authentication'],
//         pre: [
//             {
//                 method: 'petfinder.getAuth()'
//             }
//         ]
//     },
//     handler: function (request, reply) {
//         reply('Hello')
//     }
// });

exports.routes.push({
    path: servicePath + '/pets/{id}',
    method: 'GET',
    config: {
        description: 'Get Pet by Id on Petfinder API',
        tags: ['Pets'],
        pre: [
            {
                method: 'petfinder.getPet(params.id)',
                assign: 'pet'
            }
        ]
    },
    handler: function (request, reply) {
        reply(request.pre.pet);
    }
});

exports.routes.push({
    path: servicePath + '/random',
    method: 'GET',
    config: {
        description: 'Get Random on Petfinder API',
        tags: ['Pets', 'Random'],
        pre: [
            {
                method: 'petfinder.getRandomPet(query)',
                assign: 'randomPet'
            }
        ]
    },
    handler: function (request, reply) {
        reply(request.pre.randomPet);
    }
});

exports.routes.push({
    path: servicePath + '/find',
    method: 'GET',
    config: {
        description: 'Get Random on Petfinder API',
        tags: ['Pets', 'Find'],
        pre: [
            {
                method: 'petfinder.findPet(query)',
                assign: 'found'
            }
        ]
    },
    handler: function (request, reply) {
        reply(request.pre.found);
    }
});

exports.routes.push({
    path: servicePath + '/breeds/{animal}',
    method: 'GET',
    config: {
        description: 'Get Breeds for an animal from Petfinder API',
        tags: ['Breeds'],
        pre: [
            {
                method: 'petfinder.listBreeds(params.animal)',
                assign: 'list'
            }
        ]
    },
    handler: function (request, reply) {
        reply(request.pre.list);
    }
});