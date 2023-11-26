(function($) {
    "use strict";
    var three_item_carosel = function($scope, $) {
        // single-item-carousel
        if ($('.single-item-carousel').length) {
            $('.single-item-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: false,
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
                        items: 1
                    },
                    1200: {
                        items: 1
                    }

                }
            });
        }
    }
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/laborex_testimonial.default', three_item_carosel);
    });
})(window.jQuery);