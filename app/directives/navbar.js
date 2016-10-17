'use strict';
import NavTemplate from '../components/navbar/navbar.html';

class Navbar {
    constructor() {
        this.templateUrl = NavTemplate;
        this.restrict = 'E';
        this.scope = {};
    }
}

export default Navbar