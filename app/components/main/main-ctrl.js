class MainCtrl {
    constructor($state, $http) {
        /* @ngInject */
        this.$state = $state;
        this.$http = $http;
        this.pet = '';
        this.animal = '';
        this.loading = false
        this.reset = false;
        this.welcome = 'Lets find a Pet for you Today!';
        this.mainButtonText = 'Feeling Lucky?';
        this.offset = 0;
        this.additionalPets = false;
        this.selectedPet = '';
        this.foundPets = [];
    }

    // Allow for Dual purpose functionality of home button
    mainButton() {
        if (this.petId) {
            return this.$http.get(`http://localhost:3000/api/pets/${this.petId}`).then(pet => {
                return this.pet = pet.data;
            }).catch(err => {
                return swal('Oops', `${this.petId} is not a valid Pet Id`, 'error');
            })
        }
       return this.$http.get('http://localhost:3000/api/random').then(pet => {
           this.pet = pet.data;
       }).catch(err => {
            return swal('Oops', `Something went wrong`, 'error');
        })
    }

    // Allow Button to be dual purposed
    updateButton(val) {
        if (val !== '') {
            this.mainButtonText = 'Search';
            return;
        }
        this.mainButtonText = 'Feeling Lucky?';
    }

    // Build the find Query as well as handle the Next Pagination
    findPet() {
        if (!this.location) {
            return swal('Oops', 'Please enter a location', 'warning');
        }
        this.loading = true;
        let url = `http://localhost:3000/api/find?location=${this.location}`;

        if (this.animal) {
            url += `&animal=${this.animal}`;
        }

        if (this.breed) {
            url += `&breed=${this.breed}`;
        }

        if (this.foundPets.length > 0) {
            this.offset+=12;
            url += `&offset=${this.offset}`;
            if (this.offset < this.foundPets.length) {
                this.loading = false;
                return;
            }
        }

        return this.$http.get(url).then(pets => {
            this.foundPets = this.foundPets.concat(pets.data);

            if ((this.foundPets.length % 12) !== 0) {
                this.additionalPets = false;
            } else {
                this.additionalPets = true;
            }
            this.loading = false;
            this.reset = true;
        }).catch(err => {
            this.loading = false;
            if (this.animal) {
                return swal('Oops', `We were not able to find any more ${this.breed ? this.breed : this.animal}'s near ${this.location}`, 'error');
            }
            return swal('Oops', `We were not able to find any pets near ${this.location} currently`, 'error');
        })
    }

    // Pagination Previous
    previousPets() {
        this.offset-=12;
    }

    // Reset All Finding Options
    resetFind() {
        this.reset = false;
        this.offset = 0;
        this.location = '';
        this.animal = '';
        this.breed = '';
        this.foundPets = [];
    }

    // Close the Modal
    closeModal() {
        this.selectedPet = '';
    }
}

export default MainCtrl;