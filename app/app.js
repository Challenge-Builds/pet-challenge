'use strict';
// Vendors
import angular from 'angular';
import uirouter from 'angular-ui-router';

// Router
import { Router } from './router';

// Services
// -- import Services Here --
// import ExampleService from './services/exampleservice';

// Directives
// -- import Directives Here --
// import ExampleDirective from './directives/exampledirective';

// Controllers
import { MainCtrl } from './components/main/main-ctrl';

// Filters
// -- import Filters Here --
// import ExampleFilter from './filters/examplefilter';

// Styles
// -- Stylesheets can be imported as well, `.css`, `.sass`, `.scss`, etc. as long as you have the appropriate loader in the config --
import './styles/styles.scss';

angular.module('starterApp', [uirouter])
    .config(Router)
    // .service('ExampleService', ExampleService)
    // .directive('ExampleDirective', ExampleDirective)
    // .filter('exampleFilter', ExampleFilter)
    .controller('MainCtrl', MainCtrl);