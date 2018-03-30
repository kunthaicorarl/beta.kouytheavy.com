

var myApp = angular.module('appModule', [
    'ui.router',
    'chieffancypants.loadingBar',
    'ngAnimate',
    'afkl.lazyImage',
    'infinite-scroll',
    'ui.carousel'
]);


myApp.directive("scroll", function ($window) {
    return function (scope) {
     var w = angular.element($window);

      w.bind('scroll', function () {
        
        var top = document.getElementById('title').offsetHeight;
        
        if (this.pageYOffset > top) {
          scope.scrolled = true;
        }else{
          scope.scrolled = false;
        }
          scope.$apply();
      });
  }



});
myApp.config([
    '$stateProvider',
    'cfpLoadingBarProvider',
    '$urlRouterProvider',
    function ($stateProvider, cfpLoadingBarProvider, $urlRouterProvider) {
        //default true; more :https://github.com/chieffancypants/angular-loading-bar
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.latencyThreshold = 500;
        $urlRouterProvider.otherwise("/home");
        var home = {
            name: 'home_page',
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController as vm'
        }

        var videoByCategory = {
            name: 'category_page',
            url: '/category/:id',
            params: {id:null},
            templateUrl: 'category.html',
            controller: 'categoryController as vm'
        }

        var viewer = {
            name: 'viewer',
            url: '/viewer/:id',
            params: { id: null },
            templateUrl: 'viewer.html',
            controller: 'viewerController as vm'
        }
       
        $stateProvider.state(home);
        $stateProvider.state(viewer);
        $stateProvider.state(videoByCategory);
       
    }
]);