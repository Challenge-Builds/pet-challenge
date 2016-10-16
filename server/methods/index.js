'use strict';
const Utils = require('./utils');
const Promise = require('bluebird');
const http = require('request-promise');
const md5 = require('md5');

// Authenticate 
function getAuth() {
    const queryOptions = Utils.buildAuthOptions();
    return http(queryOptions).then(res => {
        // auth.getToken appears to be returning a 404
        return res;
    }).catch(err => {
        return err;
    })
}

// Get Pet
function getPet(id) {
    const queryOptions = Utils.buildQueryOptions('pet.get', {id: id});

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

    const queryOptions = Utils.buildQueryOptions('pet.getRandom', randomOptions);

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

    const queryOptions = Utils.buildQueryOptions('pet.find', findOptions);

    return http(queryOptions).then(found => {
        return found.petfinder.pets.pet.map(pet => Utils.cleanUpData(pet));
    }).catch(err => {
        console.log(err)
        return err;
    })
}

// List Breeds
function listBreeds(animal) {
    const queryOptions = Utils.buildQueryOptions('breed.list', {animal: animal.toLowerCase()});

    return http(queryOptions).then(list => {
        return list.petfinder.breeds.breed.map(breed => breed['$t']);
    }).catch(err => {
        return err;
    })
}

exports.methods = [];

exports.methods.push(Utils.createNamespaceMethod(getAuth));
exports.methods.push(Utils.createNamespaceMethod(getPet));
exports.methods.push(Utils.createNamespaceMethod(getRandomPet));
exports.methods.push(Utils.createNamespaceMethod(findPet));
exports.methods.push(Utils.createNamespaceMethod(listBreeds));