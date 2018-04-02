myApp.directive("robertOwlCarousel", [
    "$compile",
    "$sce",
    "$window",
    "$state",
    function ($compile, $sce, $window, $state) {
        return {
            restrict: 'E',
            template: '<div class="container backgroupd-container" style="padding: 13px;"><div class="owl-carousel owl-theme">\
              <img owl-carousel-item ng-repeat="item in slides.item" ng-click="goTo(item.id)" class="owl-lazy pointer" data-src="{{item.url}}" data-src-retina="{{item.url}}" alt="">\
              </div></div>',
            link: function (scope, element, attrs) {
                scope.slides = {
                     item:[]
                };
                scope.goTo = function (id) {
                    $state.go("category_page", {id:id});
                };
                scope.slides.item.push({

                    id: 30,

                    url: 'http://www.kouytheavy.com/ArtOfTheDeal.png',

                    link: 'http://www.kouytheavy.com/archives/category/the-art-of-the-deal',

                    price: 0,

                    title: 'ážŸáž·áž›áŸ’áž”áŸˆáž’áž»ážšáž€áž·áž…áŸ’áž…',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 29,

                    link: 'http://www.kouytheavy.com/archives/category/think-like-a-billionaire',

                    url: 'http://www.kouytheavy.com/thinklikebillionaired.png',

                    price: 0,

                    title: 'áž‚áž·ážážŠáž¼áž…áž˜áž áž¶ážŸáŸážŠáŸ’áž‹áž¸áž”áŸ’ážšáž¶áž€áŸ‹áž€áŸ„ážŠáž·',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 29,

                    link: 'http://www.kouytheavy.com/archives/category/rich-dad-poor-dad',

                    url: 'http://www.kouytheavy.com/richdadpoordad.png',

                    price: 0,

                    title: 'áž–áž»áž€áž˜áž¶áž“ áž–áž»áž€áž€áŸ’ážš',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 27,

                    link: 'http://www.kouytheavy.com/archives/category/cash-flow-quadrant',

                    url: 'http://www.kouytheavy.com/ClashflowQundrant.png',

                    price: 0,

                    title: 'áž˜ážŽáŸ’ážŒáž›áž›áŸ†áž áž¼ážšážŸáž¶áž…áŸ‹áž”áŸ’ážšáž¶áž€áŸ‹',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 1,

                    link: 'http://www.kouytheavy.com/archives/category/how-to-get-rich',

                    url: 'http://www.kouytheavy.com/howToGetRich.png',

                    price: 0,

                    title: 'áž’áŸ’ážœáž¾áž˜áŸ‰áŸáž…áž”áž¶áž“áž˜áž¶áž“',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });



                scope.slides.item.push({

                    id: 1,

                    link: 'http://www.kouytheavy.com/archives/category/trump-strategies-for-real-estate',

                    url: 'http://www.kouytheavy.com/trump-stragies-for-real-estate.png',

                    price: 0,

                    title: 'Trump strategies for Real Estate',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 38,

                    link: 'http://www.kouytheavy.com/archives/category/the-richest-man-in-babylon',

                    url: 'http://www.kouytheavy.com/the-richest-man-in-babylon.png',

                    price: 0,

                    title: 'The Richest man in babylon',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 37,

                    link: 'http://www.kouytheavy.com/archives/category/the-wealth-of-nations',

                    url: 'http://www.kouytheavy.com/the-wealth-of-nations.png',

                    price: 0,

                    title: 'áž‘áŸ’ážšáž–áŸ’áž™ážŸáž˜áŸ’áž”ážáŸ’ážáž·áž”áŸ’ážšáž‡áž¶áž‡áž¶ážáž·',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });

                scope.slides.item.push({

                    id: 41,

                    link: 'http://www.kouytheavy.com/archives/category/gold-and-silver',

                    url: 'http://www.kouytheavy.com/gold-and-silver.png',

                    price: 0,

                    title: 'Gold & Silver',

                    description: '',

                    created: new Date(),

                    updated: new Date(),

                });
                scope.initCarousel = function (element) {
                    $(".owl-carousel").owlCarousel({
                        items:4,
                        lazyLoad: true,
                        loop: true,
                        margin: 10,
                        autoplay: true,
                        autoplayTimeout: 1000,
                        autoplayHoverPause: true
                    });
                }
               
            }
        }
    }
]).directive('owlCarouselItem', [function () {
    return {
        restrict: 'A',
        transclude: false,
        link: function (scope, element) {
            // wait for the last item in the ng-repeat then call init
            if (scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);