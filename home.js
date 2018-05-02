myApp.controller("homeController", [
    'cfpLoadingBar',
    '$scope',
    '$http',
    function (cfpLoadingBar, $scope, $http) {
        var vm = this;
        $("#wrapper").toggleClass("toggled");
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
        vm.nextPage = 0;
        vm.dataDisplay = [];
        vm.stepNumber=[];
        vm.lockLoading = false;


        function loadCategoryInfo(callback) {
            $http.get('category.json')
                .then(function (res) {
                    callback(res);
                });
        }
        
        vm.initCategory = function () {
           
            if(!vm.lockLoading){
                cfpLoadingBar.start();
                $http({
                    url:"http://www.kouytheavy.com/wp-json/wp/v2/categories", 
                    method: "GET",
                    params: {
                        per_page: 1,
                        page:vm.dataDisplay.length+1
                     }
                 })
                    .then(function (result) {
                        if(result.data.length){
                            var  objInput={
                                "id": result.data[0].id,  
                                "title":result.data[0].name,
                                "categoryLink":result.data[0].link,
                                "items": [],
                                "isLoading": true
                            };
                            loadCategoryInfo(function (result) {
                                if (result.data.length) {
                                    result.data.filter(function (item) {
                                        if (objInput.id == item.categoryId) {
                                        objInput["book"] = item;
                                        }
                                    });

                                }
                            });
                          if(vm.dataDisplay.length)
                           {
                              var filterID = vm.dataDisplay.filter(function (item) {
                                  return (item.id == objInput.id);
                              });
                              if (!filterID.length) {
                                  vm.dataDisplay.push(objInput);    
                                  vm.initPostByCategory(objInput);
                                  
                              }else{
                                  return;
                              }
                          } else {
                              vm.dataDisplay.push(objInput);
                              vm.initPostByCategory(objInput);
                            
                           }
                        }else{
                            vm.lockLoading=true;
                        }
                    }).finally(function () {
                       
                        cfpLoadingBar.complete();
                    });
            }}           
            vm.openViewer=function(img){
                $(this).magnificPopup({
                    items: {
                      src:img,
                      type: 'image'
                    }
                    // (optionally) other options
                  }).magnificPopup('open');
            }; 
        vm.initPostByCategory = function (objCategory) {
            if (vm.dataDisplay.length) {
                $http({
                    url: "http://www.kouytheavy.com/wp-json/wp/v2/posts?_embed",
                    method: "GET",
                    params: {
                        per_page: 4,
                        page: 1,
                        categories: objCategory.id
                    }
                }).then(function (result) {
                    var items = [];
                    angular.forEach(result.data, function (item) {
                        var thumb = '';
                        var bookInfo = {};
                        


                        if (objCategory.id == 28) {
                            thumb = 'photo/thumbnail/thumbnail-rich-dad-poor-dad.png';
                        } else if (objCategory.id == 37) {
                            thumb = 'photo/thumbnail/the-wealth-of-nations.png';
                        } else if (objCategory.id == 27) {
                            thumb = 'photo/thumbnail/thumbnail-cashflow.png';
                        } else if (objCategory.id == 1) {
                            thumb = 'photo/thumbnail/thumbnail-how-to-get-rich.png';
                        } else {
                            thumb = '';
                        }
                        var obj = {
                            "id": item.id,
                            "book": bookInfo ? bookInfo : null,
                            "title": item.title.rendered,
                            "thumbnail": thumb ? thumb : 'https://image.freepik.com/free-icon/lock-padlock-symbol-for-protect_318-50517.jpg',//(item._embedded["wp:featuredmedia"][0].source_url ? item._embedded["wp:featuredmedia"][0].source_url : (thumb !== '' ? thumb:'https://image.freepik.com/free-icon/lock-padlock-symbol-for-protect_318-50517.jpg')),
                            "link": item.link,
                            "status": "Free",
                            "price": 0,
                            "isLoading": true
                        };
                        items.push(obj);

                    });

                    vm.dataDisplay = vm.dataDisplay.map(function (item) {
                        if (item.id == objCategory.id) {
                            item.items = items;
                        }
                        return item;
                    });
                    }).finally(function () {
                        vm.dataDisplay = vm.dataDisplay.map(function (item) {
                            if (item.id == objCategory.id) {
                                item.isLoading = false;
                            }
                            return item;
                        });
                    });
            }
        };
        vm.initCategory();

        vm.slides = {

            options: {

                'slidesToShow': 4,

                'initialSlide': 1,

                speed: 4000,

                autoPlay: true,

                dot: false,

            },

            item: []

        };

        vm.slides.item.push({

            id: 1,

            url: 'http://www.kouytheavy.com/ArtOfTheDeal.png',

            link: 'http://www.kouytheavy.com/archives/category/the-art-of-the-deal',

            price: 0,

            title: 'សិល្បៈធុរកិច្ច',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/think-like-a-billionaire',

            url: 'http://www.kouytheavy.com/thinklikebillionaired.png',

            price: 0,

            title: 'គិតដូចម� ាសេដ្ឋីប្រាក់កោដិ',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/rich-dad-poor-dad',

            url: 'http://www.kouytheavy.com/richdadpoordad.png',

            price: 0,

            title: 'ពុកមាន ពុកក្រ',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/cash-flow-quadrant',

            url: 'http://www.kouytheavy.com/ClashflowQundrant.png',

            price: 0,

            title: 'មណ្ឌលលំ� ូរសាច់ប្រាក់',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/how-to-get-rich',

            url: 'http://www.kouytheavy.com/howToGetRich.png',

            price: 0,

            title: 'ធ្វើម៉េចបានមាន',

            description: '',

            created: new Date(),

            updated: new Date(),

        });



        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/trump-strategies-for-real-estate',

            url: 'http://www.kouytheavy.com/trump-stragies-for-real-estate.png',

            price: 0,

            title: 'Trump strategies for Real Estate',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/the-richest-man-in-babylon',

            url: 'http://www.kouytheavy.com/the-richest-man-in-babylon.png',

            price: 0,

            title: 'The Richest man in babylon',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/the-wealth-of-nations',

            url: 'http://www.kouytheavy.com/the-wealth-of-nations.png',

            price: 0,

            title: 'ទ្រព្យសម្បត្តិប្រជាជាតិ',

            description: '',

            created: new Date(),

            updated: new Date(),

        });

        vm.slides.item.push({

            id: 1,

            link: 'http://www.kouytheavy.com/archives/category/gold-and-silver',

            url: 'http://www.kouytheavy.com/gold-and-silver.png',

            price: 0,

            title: 'Gold and silver',

            description: '',

            created: new Date(),

            updated: new Date(),

        });


    }
]);