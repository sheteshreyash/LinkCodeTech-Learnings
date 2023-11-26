(function($) {

    "use strict";

    var two_item_carousel_js = function($scope, $) {


        //two-column-carousel
        if ($('.two-column-carousel').length) {
            $('.two-column-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                smartSpeed: 500,
                autoplay: 1000,
                navText: ['<span class="icon-19"></span>', '<span class="icon-18"></span>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    800: {
                        items: 2
                    },
                    1024: {
                        items: 2
                    }
                }
            });
        }


    }

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/laborex_Blog.default', two_item_carousel_js);
    });
})(window.jQuery);