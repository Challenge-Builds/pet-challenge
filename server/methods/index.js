'use strict';
const Utils = require('./utils');
const Promise = require('bluebird');
const http = require('request-promise');

// Authenticate 
// function getAuth() {
//     const sig = md5(`${secret}key=${key}`);
//     const options = {
//         uri: `${APIBaseUrl}auth.getToken`,
//         qs: {
//             key: key,
//             format: format,
//             sig: sig
//         },
//         headers: {
//             'User-Agent': 'Request-Promise',
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     }
//     return http(options).then(res => {
//         console.log(res.body)
//         console.log('BODY')
//         return;
//     }).catch(err => {
//         console.log(err)
//         return err;
//     })
// }

// Get Pet
function getPet(id) {
    var queryOptions = Utils.buildQueryOptions('pet.get', {id: id});

    return http(queryOptions).then(pet => {
        return Utils.cleanUpData(pet.petfinder.pet);
    }).catch(err => {
        return err;
    })
}

// Get Random Pet
function getRandomPet(options) {
    var randomOptions = options ? options : {};
    randomOptions.output = 'full';

    var queryOptions = Utils.buildQueryOptions('pet.getRandom', randomOptions);

    return http(queryOptions).then(random => {
        return Utils.cleanUpData(random.petfinder.pet);
    }).catch(err => {
        return err;
    })
}

// Find Pet
function findPet(options) {
    var findOptions = options ? options : {};
    findOptions.output = 'full';
    findOptions.count = 12;
    var queryOptions = Utils.buildQueryOptions('pet.find', findOptions);

    return http(queryOptions).then(found => {
        return found.petfinder.pets.pet.map(pet => Utils.cleanUpData(pet));
    }).catch(err => {
        return err;
    })
}

// List Breeds
function listBreeds(animal) {
    var queryOptions = Utils.buildQueryOptions('breed.list', {animal: animal});

    return http(queryOptions).then(list => {
        return list.petfinder.breeds.breed.map(breed => breed['$t']);
    }).catch(err => {
        return err;
    })
}

exports.methods = [];

// exports.methods.push(Utils.createNamespaceMethod(getAuth));
exports.methods.push(Utils.createNamespaceMethod(getPet));
exports.methods.push(Utils.createNamespaceMethod(getRandomPet));
exports.methods.push(Utils.createNamespaceMethod(findPet));
exports.methods.push(Utils.createNamespaceMethod(listBreeds));