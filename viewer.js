myApp.controller("viewerController", [
    'cfpLoadingBar',
    '$scope',
    '$http',
    '$stateParams',
    '$compile',
    '$state',
    function (cfpLoadingBar, $scope, $http, $stateParams, $compile, $state) {
        var vm = this;
        vm.title = $stateParams.title ? $stateParams.title : "Unknown";
        vm.displayVideo = {protected:false,items:[]};
        vm.initVideoData = function (password) {
            cfpLoadingBar.start();
            var postRequest = {};
            if (vm.displayVideo.protected  && password !== undefined) {
                postRequest = {
                    url: "http://www.kouytheavy.com/wp-json/wp/v2/posts/" + $stateParams.id,
                    method: "GET",
                    params: {
                        password: password,
                    }
                };
            } else {
                postRequest = {
                    url: "http://www.kouytheavy.com/wp-json/wp/v2/posts/" + $stateParams.id,
                    method: "GET"
                };
            }
            $http(postRequest)
                .then(function (result) {
                    if (result.data.content.protected && result.data.content && !result.data.content.rendered) {
                            vm.displayVideo = { protected: true, items: []};
                    } else {
                        if (result.data.acf && result.data.acf.video_list) {
                            var s = result.data.acf.video_list;
                            s = s.replace(/\\n/g, "\\n")
                                .replace(/&quot;/g, '"')
                                .replace(/\\'/g, "\\'")
                                .replace(/\\"/g, '\\"')
                                .replace(/\\&/g, "\\&")
                                .replace(/\\r/g, "\\r")
                                .replace(/\\t/g, "\\t")
                                .replace(/\\b/g, "\\b")
                                .replace(/\\f/g, "\\f");
                            // remove non-printable and other non-valid JSON chars
                            s = s.replace(/[\u0000-\u0019]+/g, "");
                            var o = JSON.parse(s);
                            vm.displayVideo = { protected: false, items: o };

                        } else {

                            vm.msgNotFound = true;

                        }
                           
                        }
                      
                }, function (error) {
                    vm.displayError = error.data;

                }).finally(function () {
                        cfpLoadingBar.complete();
                    });
        }
        vm.initVideoData();
        vm.back=function(){
            $state.go("home_page");
        }
   
        vm.save = function () {
         //   $scope.contractForm.$submitted = true;
            vm.initVideoData(vm.password);
        };
       
     
    }
]);