

var myApp = angular.module('appModule', [
    'ui.router',
    'chieffancypants.loadingBar',
    'ngAnimate',
    'afkl.lazyImage',
    'infinite-scroll',
    'ui.carousel'
]);
myApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

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
        var search = {
            name: 'search',
            url: '/search',
            templateUrl: 'search.html',
            controller: 'searchController as vm'
        }
       
        $stateProvider.state(home);
        $stateProvider.state(viewer);
        $stateProvider.state(videoByCategory);
        $stateProvider.state(search);
    }
]);

myApp.run(["$rootScope", "$http","$state", function ($rootScope, $http,$state) {

    $rootScope.searchData = function (callback) {
        $state.go("search");
        $rootScope.dataDisplayBySearch = [];
        var input = {
            search: $rootScope.searchText,
        };
        $http({
            url: "http://www.kouytheavy.com/wp-json/wp/v2/posts?_embed",
            method: "GET",
            params: input
        }).then(function (result) {
            angular.forEach(result.data, function (item) {
                var obj = {
                    "id": item.id,
                    "title": item.title.rendered,
                    "thumbnail": item._embedded["wp:featuredmedia"][0].source_url,
                    "link": item.link,
                    "status": "Free",
                    "price": 0
                };
                $rootScope.dataDisplayBySearch.push(obj);
            });
        }, function (error) {
            return;
        });

    };
   
}]);


