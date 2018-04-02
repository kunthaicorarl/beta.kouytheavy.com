myApp.controller("searchController", [
    'cfpLoadingBar',
    '$scope',
    '$http',
    '$stateParams',
    '$state',
    '$rootScope',
    function (
        cfpLoadingBar,
        $scope,
        $http,
        $stateParams,
        $state,
        $rootScope,
    ) {
        var vm = this;
     //   vm.lockLoading = false;
        ////$rootScope.searchData(function (result) {
        ////    vm.dataDisplay = [];
        ////    cfpLoadingBar.start();
        ////    angular.forEach(result.data, function (item) {
        ////        var obj = {
        ////            "id": item.id,
        ////            "title": item.title.rendered,
        ////            "thumbnail": item._embedded["wp:featuredmedia"][0].source_url,
        ////            "link": item.link,
        ////            "status": "Free",
        ////            "price": 0
        ////        };
        ////        vm.dataDisplay.push(obj);
        ////    });
        ////    }).finally(function () {
        ////        cfpLoadingBar.complete();
        ////    });
        ////    vm.back = function () {
        ////        $state.go("home_page");
        ////    }
     
    }
]);