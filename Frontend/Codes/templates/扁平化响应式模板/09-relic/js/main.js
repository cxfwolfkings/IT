;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
	      (navigator.platform.indexOf("iPhone") != -1) || 
	      (navigator.platform.indexOf("iPod") != -1)
	    );
	};

	
	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	var menuAnimate = function(o, mtop,duration, mul) {
		var navLi = $('#fh5co-main-nav li');
		navLi.each( function(k){
			var el = $(this);
			setTimeout(function() {
				el.velocity(
					{ opacity: o, marginTop: mtop }, 
					{ duration: duration }
				);
			},  k * mul );
		});
		setTimeout(function(){
			$('.fh5co-social').velocity({
				opacity: o,
				marginTop: mtop
			}, { duration: duration });
		}, (navLi.length + 1) * mul );
		
	};

	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(){
			$(this).toggleClass('active');
			$('body').toggleClass('nav-active');
			if ($('body').hasClass('nav-active')) {
				menuAnimate(1, 10, 1000, 50);	
			} else {
				menuAnimate(0, 0, 1, 0);	
			}
			
		});
	};

	var menuWrapScroll = function(){
		var fh5coMainWrap = $('#fh5co-main-nav-wrap');
		fh5coMainWrap.mouseenter(function(){
		    $("body").css("overflow","hidden");
		}).mouseleave(function(){
			$("body").css("overflow","auto");
		});
	};
	

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){
		$('#fh5co-tab-feature').easyResponsiveTabs({
	      type: 'default',
	      width: 'auto', 
	      fit: true, 
	      inactive_bg: '',
	      active_border_color: '',
	      active_content_border_color: '',
	      closed: 'accordion',
	      tabidentify: 'hor_1'
	            
	    });
	    $('#fh5co-tab-feature-center').easyResponsiveTabs({
	      type: 'default',
	      width: 'auto',
	      fit: true, 
	      inactive_bg: '',
	      active_border_color: '',
	      active_content_border_color: '',
	      closed: 'accordion', 
	      tabidentify: 'hor_1' 
	      
	    });
	    $('#fh5co-tab-feature-vertical').easyResponsiveTabs({
	      type: 'vertical',
	      width: 'auto',
	      fit: true,
	      inactive_bg: '',
	      active_border_color: '',
	      active_content_border_color: '',
	      closed: 'accordion',
	      tabidentify: 'hor_1'
	    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			items: 1,
		    loop: true,
		    margin: 0,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	// Smooth Scroll Top
	var sScrollTop = function () {

		$(window).scroll(function(){
			if ($(window).scrollTop() > 100 ) {
				$('.fh5co-gotop').show();
			} else {
				$('.fh5co-gotop').hide();
			}
		});
		$('.fh5co-gotop').click(function(event){

		    $('html, body').animate({
		        scrollTop: 0
		    }, 500);

		    event.preventDefault();
		    return false;
		});
	}
	

	$(function(){
		burgerMenu();
		menuWrapScroll();
		mobileFastClick();
		responsiveTabs();
		magnifPopup();
		owlCrouselFeatureSlide();
		sScrollTop();
	});


}());