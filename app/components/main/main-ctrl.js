class MainCtrl {
    constructor($state, $http) {
        /* @ngInject */
        this.$state = $state;
        this.$http = $http;
        this.randomPet = '';
        this.animal = '';
        this.loading = false;
        this.welcome = 'Lets find a Pet for you Today!';
    }

    getRandomPet() {
       return this.$http.get('http://localhost:3000/api/random').then(pet => {
           this.randomPet = pet.data;
       })
    }

    findPet() {
        if (!this.location) {
            return alert('Please enter a location');
        }
        this.loading = true;
        let url = `http://localhost:3000/api/find?location=${this.location}`;
        if (this.animal) {
            url += `&animal=${this.animal}`;
        }
        return this.$http.get(url).then(pets => {
            this.foundPets = pets.data;
            this.loading = false;
        })
    }
}

export { MainCtrl };