// Templates
import MainTemplate from './components/main/main.html'
import FindTemplate from './components/find/find.html'

/* @ngInject */
function Router($stateProvider, $urlRouterProvider) {
    // when trying to navigate to a non-existent route, go to login
    $urlRouterProvider.otherwise("/");
    // when there is an empty route, redirect to /login
    $urlRouterProvider.when('', '/');

    $stateProvider
        .state('main', {
            url: "/",
            controller: "MainCtrl as app",
            templateUrl: MainTemplate
        })
        .state('find', {
            url: "/find",
            controller: "MainCtrl as app",
            templateUrl: FindTemplate
        });
}

export { Router }