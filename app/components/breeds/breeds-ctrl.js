class BreedsCtrl {
    constructor($state, $http) {
        /* @ngInject */
        this.$state = $state;
        this.$http = $http;
        this.foundBreeds = '';
        this.animal = '';
        this.loading = false
        this.welcome = 'Lets find a Breed for you Today!';
    }

    findBreeds() {
        if (!this.animal) {
            return swal('Oops', 'Please enter an animal', 'warning');
        }
        this.loading = true;
        let url = `http://localhost:3000/api/breeds/${this.animal}`;
        return this.$http.get(url).then(breeds => {
            this.foundBreeds = breeds.data;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
           if (err) {
               return swal('Oops', `There was an issue finding breeds for ${this.animal}. \n Please check the spelling.`, 'error')
           }
           return;
        })
    }
}

export default BreedsCtrl;