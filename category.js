myApp.controller("categoryController", [
    'cfpLoadingBar',
    '$scope',
    '$http',
    '$stateParams',
    '$state',
    function (
        cfpLoadingBar,
        $scope,
        $http,
        $stateParams,
        $state,
    ) {
        var vm = this;
      
        vm.dataDisplay = [];
        vm.lockLoading = false;
        vm.initPostByCategory = function () {
            if (!vm.lockLoading) {
                cfpLoadingBar.start();
                $http({
                    url: "http://www.kouytheavy.com/wp-json/wp/v2/posts?_embed",
                    method: "GET",
                    params: {
                        page: vm.dataDisplay.length + 1,
                        categories:$stateParams.id
                    }
                })
                    .then(function (result) {
                        
                        if (result.data.length) {
                            var items = [];
                            angular.forEach(result.data, function (item) {
                                var obj = {
                                    "id":item.id,
                                    "title": item.title.rendered,
                                    "thumbnail": item._embedded["wp:featuredmedia"][0].source_url,
                                    "link": item.link,
                                    "status": "Free",
                                    "price": 0
                                };
                                items.push(obj);
                            });
                            if (vm.dataDisplay.length) {
                                var filterID = items.filter(function (itemIndex) {
                                    return vm.dataDisplay.includes(itemIndex);
                                });
                                if (!filterID.length) {
                                    vm.dataDisplay.concat(items);
                                };
                            } else {
                                vm.dataDisplay = items;
                            }     
                        } else {
                            vm.lockLoading = true;
                        }
                    }, function (error) {
                        vm.lockLoading = true;
                        return;
                    }).finally(function () {
                        cfpLoadingBar.complete();
                    });
            }
        }   
        vm.initPostByCategory();
        vm.back = function () {
            $state.go("home_page");
        }
    }
]);