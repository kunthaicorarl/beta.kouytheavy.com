myApp.directive("robertViewer", [
    "$compile",
    "$sce",
    "$window",
    function ($compile, $sce, $window) {
        return {
            restrict: 'E',
            scope: {
                html: "=",
                autoPlay: "=",
                save: "&",
                password: "="
            },
            template: '\
            <div ng-if="!html.protected" >\
            <div class="col-md-8" style="padding: 2px;" >\
            <div id="player"></div>\
             </div>\
            <div class="col-md-4 videre-item-container">\
                <h1 class="videre-video-title">\
                    Video TITTL\
                     </h1>\
                <div class="row">\
                    <div class="col-md-12 videre-list" ng-if="html.items" ng-repeat="item in html.items" ng-click="viewerVideo(item)">\
                        <div class="col-md-4">\
                            <img style="width: 100%;" src="{{item && item.image?item.image:noImage}}" />\
                        </div>\
                        <div class="col-md-8">\
                            <span>{{item.title}}</span>\
                        </div>\
                    </div>\
                </div>\
            </div>\
         </div>',
            link: function (scope, element, attrs) {
                scope.isMobileView = false;
                scope.noImage = "data:image/png;base64,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";
                scope.viewerVideo = function (item) {
                    $('#player').empty();
                    $('#player').videre({
                        video: {
                            quality: [
                                {
                                    label: '360p',
                                    src: item.file
                                }
                            ],
                            title:item.title
                        },
                        dimensions: 768
                    });

                    var w = angular.element($window);
                    scope.getWindowDimensions = function () {
                        return {
                            'h': w.height(),
                            'w': w.width()
                        };
                    };
                    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                        scope.windowHeight = newValue.h;
                        scope.windowWidth = newValue.w;
                        if (newValue.w <= 768) {
                            $(".vid-wrapper.videre-container").css({ "width": "100%" });
                            $(".vid-wrapper.videre-container").css({ "width": "100%" });
                            $("#player>div>video").css({ "width": "100%", "height": "320px" });
 
                        } else {
                            scope.isMobileView = false;
                           
                        }
                    }, true);

                    w.bind('resize', function () {
                        scope.$apply();
                    });
                 
                    
                }

                scope.$watch("html", function (e, o) {
                    if (e && scope.autoPlay && scope.html && !scope.html.protected && scope.html.items.length) {
                        scope.viewerVideo(scope.html.items[0]);
                    }
                });
               
            }
        }
    }
]);