'use strict';
// Vendors
import angular from 'angular';
import uirouter from 'angular-ui-router';
import sweetalert from '../node_modules/sweetalert/dist/sweetalert.min'

// Router
import { Router } from './router';

// Services
// -- import Services Here --
// import ExampleService from './services/exampleservice';

// Directives
import Navbar from './directives/navbar';

// Controllers
import MainCtrl from './components/main/main-ctrl';
import BreedsCtrl from './components/breeds/breeds-ctrl';

// Filters
// -- import Filters Here --
// import ExampleFilter from './filters/examplefilter';

// Styles
// -- Stylesheets can be imported as well, `.css`, `.sass`, `.scss`, etc. as long as you have the appropriate loader in the config --
import './styles/styles.scss';
import '../node_modules/sweetalert/dist/sweetalert.css'

angular.module('starterApp', [uirouter])
    .config(Router)
    // .service('ExampleService', ExampleService)
    .directive('navbar', () => new Navbar())
    // .filter('exampleFilter', ExampleFilter)
    .controller('MainCtrl', MainCtrl)
    .controller('BreedsCtrl', BreedsCtrl)
    .filter('Paginate', function() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        }
    });;