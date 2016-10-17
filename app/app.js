'use strict';
// Vendors
import angular from 'angular';
import uirouter from 'angular-ui-router';
import sweetalert from '../node_modules/sweetalert/dist/sweetalert.min'

// Router
import { Router } from './router';

// Directives
import Navbar from './directives/navbar';

// Controllers
import MainCtrl from './components/main/main-ctrl';
import BreedsCtrl from './components/breeds/breeds-ctrl';

// Styles
import './styles/styles.scss';
import '../node_modules/sweetalert/dist/sweetalert.css'

angular.module('starterApp', [uirouter])
    .config(Router)
    .directive('navbar', () => new Navbar())
    .controller('MainCtrl', MainCtrl)
    .controller('BreedsCtrl', BreedsCtrl)
    .filter('Paginate', () => {
        /**
         * 
         * This filter handles basic pagination rules for us.
         * The offset will be used to determine the next and 
         * previous button functionalities and whether or not 
         * to request additional pets or to loop through our 
         * existing content
         * 
         */  
        return (input, start) => {
            start = +start;
            return input.slice(start);
        }
    });;