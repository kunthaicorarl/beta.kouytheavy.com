myApp.directive("robertDailog", [
    function () {
        return {
            restrict: 'A',
            scope: {
                robertSrc:'@'
            },
            link: function (scope, element, attrs) {
                var attr = {
                    type:'ajax',
                    items: [{
                        src: '<div class="white-popup">\
                        <div class="row">\
                        <div class="col-md-8 text-center">\
                        <div class="robert-content-view" style="margin-top: 74px;">\
                         <img src="'+ scope.robertSrc + '" style="\
                        width: 100 %;\
                        height: auto;\
                        vertical-align: middle;\
                        margin: 0px auto;\
"/>\
                        </div>\
                        </div>\
                        <div class="col-md-4">\
                            <div ng-include="'+ '/loading.html' + '"></div>\
                        </div>\
                            <button title="Close (Esc)" type="button" class="mfp-close">X</button></div></div></div>',
                        type: 'inline'
                    }, {
                        src: '<div class="white-popup">\
                        <div class="row">\
                        <div class="col-md-8 text-center">\
                        <div class="robert-content-view" style="margin-top: 74px;">\
                         <img src="'+ scope.robertSrc + '" style="\
                        width: 100 %;\
                        height: auto;\
                        vertical-align: middle;\
                        margin: 0px auto;\
"/>\
                        </div>\
                        </div>\
                        <div class="col-md-4">\
                            <div ng-include="'+ '/loading.html' + '"></div>\
                        </div>\
                            <button title="Close (Esc)" type="button" class="mfp-close">X</button></div></div></div>',
                        type: 'inline'
                        }, {
                            src: '<div class="white-popup">\
                        <div class="row">\
                        <div class="col-md-8 text-center">\
                        <div class="robert-content-view" style="margin-top: 74px;">\
                         <img src="'+ scope.robertSrc + '" style="\
                        width: 100 %;\
                        height: auto;\
                        vertical-align: middle;\
                        margin: 0px auto;\
"/>\
                        </div>\
                        </div>\
                        <div class="col-md-4">\
                            <div ng-include="'+ '/loading.html' + '"></div>\
                        </div>\
                            <button title="Close (Esc)" type="button" class="mfp-close">X</button></div></div></div>',
                            type: 'inline'
                        }],
                    gallery: {
                        enabled: true
                    },
                    type: 'image' // this is default type
                    ,callbacks: {
                        beforeOpen: function () {
                            console.log('Start of popup initialization');
                        },
                        elementParse: function (item) {
                            // Function will fire for each target element
                            // "item.el" is a target DOM element (if present)
                            // "item.src" is a source that you may modify

                            console.log('Parsing content. Item object that is being parsed:', item);
                        },
                        change: function () {
                            console.log('Content changed');
                            console.log(this.content); // Direct reference to your popup element
                        },
                        resize: function () {
                            console.log('Popup resized');
                            // resize event triggers only when height is changed or layout forced
                        },
                        open: function () {
                            console.log('Popup is opened');
                        },

                        beforeClose: function () {
                            // Callback available since v0.9.0
                            console.log('Popup close has been initiated');
                        },
                        close: function () {
                            console.log('Popup removal initiated (after removalDelay timer finished)');
                        },
                        afterClose: function () {
                            console.log('Popup is completely closed');
                        },

                        markupParse: function (template, values, item) {
                            // Triggers each time when content of popup changes
                            // console.log('Parsing:', template, values, item);
                        },
                        updateStatus: function (data) {
                            console.log('Status changed', data);
                            // "data" is an object that has two properties:
                            // "data.status" - current status type, can be "loading", "error", "ready"
                            // "data.text" - text that will be displayed (e.g. "Loading...")
                            // you may modify this properties to change current status or its text dynamically
                        },
                        imageLoadComplete: function () {
                            // fires when image in current popup finished loading
                            // avaiable since v0.9.0
                            console.log('Image loaded');
                        },


                        // Only for ajax popup type
                        parseAjax: function (mfpResponse) {
                            // mfpResponse.data is a "data" object from ajax "success" callback
                            // for simple HTML file, it will be just String
                            // You may modify it to change contents of the popup
                            // For example, to show just #some-element:
                            // mfpResponse.data = $(mfpResponse.data).find('#some-element');

                            // mfpResponse.data must be a String or a DOM (jQuery) element

                            console.log('Ajax content loaded:', mfpResponse);
                        },
                        ajaxContentAdded: function () {
                            // Ajax content is loaded and appended to DOM
                            console.log(this.content);
                        }
                    }
                };
                $(element).magnificPopup(attr);
            }
        }
    }
]);