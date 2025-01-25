(function($) {

	"use strict";



	//Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				780:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});
	}


	//Testimonial Item Carousel
	if ($('.testimonial-item-carousel').length) {
		$('.testimonial-item-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				780:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});
	}


	//Three Item Carousel
	if ($('.three-item-carousel').length) {
		$('.three-item-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				780:{
					items:2
				},
				800:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:3
				}
			}
		});
	}


	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}


	//Progress Bar / Levels
	if($('.progress-levels .progress-box .bar-fill').length){
		$(".progress-box .bar-fill").each(function() {
			$('.progress-box .bar-fill').appear(function(){
				var progressWidth = $(this).attr('data-percent');
				$(this).css('height',progressWidth+'%');
			});

		},{accY: 0});
	}





	// Product Carousel Slider
	if ($('.history-carousel .content-carousel').length && $('.history-carousel .thumbs-carousel').length) {

		var $sync3 = $(".history-carousel .content-carousel"),
			$sync4 = $(".history-carousel .thumbs-carousel"),
			flags = false,
			durations = 500;

			$sync3
				.owlCarousel({
					loop:false,
					items: 1,
					margin: 0,
					nav: true,
					navText: [ '<span class="icon flaticon-left-arrow-1"></span>', '<span class="icon flaticon-right-arrow-1"></span>' ],
					dots: false,
					autoplay: true,
					autoplayTimeout: 5000
				})
				.on('changed.owl.carousel', function (e) {
					if (!flags) {
						flags = false;
						$sync4.trigger('to.owl.carousel', [e.item.index, durations, true]);
						flags = false;
					}
				});

			$sync4
				.owlCarousel({
					loop:false,
					margin: 0,
					items: 1,
					nav: true,
					navText: [ '<span class="icon flaticon-left-arrow-1"></span>', '<span class="icon flaticon-right-arrow-1"></span>' ],
					dots: false,
					center: false,
					autoplay: true,
					autoplayTimeout: 5000,
					responsive: {
						0:{
				            items:1,
				            autoWidth: false
				        },
				        400:{
				            items:1,
				            autoWidth: false
				        },
				        600:{
				            items:1,
				            autoWidth: false
				        },
				        900:{
				            items:1,
				            autoWidth: false
				        },
				        1000:{
				            items:1,
				            autoWidth: false
				        }
				    },
				})

		.on('click', '.owl-item', function () {
			$sync3.trigger('to.owl.carousel', [$(this).index(), durations, true]);
		})
		.on('changed.owl.carousel', function (e) {
			if (!flags) {
				flags = true;
				$sync3.trigger('to.owl.carousel', [e.item.index, durations, true]);
				flags = false;
			}
		});

	}

	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}

			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}


	//Two Item Carousel
	if ($('.two-item-carousel').length) {
		$('.two-item-carousel').owlCarousel({
			loop:true,
			margin:70,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="flaticon-left-arrow-1"></span>', '<span class="flaticon-right-arrow-1"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:2
				},
				1200:{
					items:2
				}
			}
		});
	}




    //one Item Carousel
	if ($('.one-item-carousel').length) {
		$('.one-item-carousel').owlCarousel({
			loop:false,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});
	}

	//Two Item Testimonial
	if ($('.testimonial-two-item').length) {
		$('.testimonial-two-item').owlCarousel({
			loop:true,
			margin:70,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="flaticon-left-arrow-1"></span>', '<span class="flaticon-right-arrow-1"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:2
				},
				1200:{
					items:2
				}
			}
		});
	}


	// Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: 4000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				600:{
					items:4
				},
				800:{
					items:5
				},
				1024:{
					items:6
				}
			}
		});
	}


	// Sponsors Carousel Two
	if ($('.sponsors-carousel-two').length) {
		$('.sponsors-carousel-two').owlCarousel({
			loop:true,
			margin:20,
			nav:true,
			smartSpeed: 500,
			autoplay: 4000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				600:{
					items:4
				},
				800:{
					items:5
				},
				1024:{
					items:5
				}
			}
		});
	}






/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */


/* ==========================================================================
   When document is loading, do
   ========================================================================== */



/* ==========================================================================
   When document is Resizing, do
   ========================================================================== */



})(window.jQuery);
