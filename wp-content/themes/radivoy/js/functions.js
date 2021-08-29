// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentel;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function ($) {

	function windowHeight(el) {
		$(el).css({'min-height': $(window).height() - $('#header').outerHeight() - $('#footer').outerHeight()});
	}
	
	$.fn.isInViewportReal = function() {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	
	$.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight > this.height();
	}

	function checkOverflow() {
		var root = document.getElementsByTagName( 'html' )[0];
		if($('html').hasScrollBar()) {
			root.classList.remove('scrolled');
		} else {
			root.classList.add('scrolled');
		}
	}

	function appear(el,delay) {
		setTimeout(function(){ el.addClass('visible') },delay);
	}

	function showProjects() {
		$('.appear').each(function(){
			var el 	= $(this);			
			var delay = $(this).data('delay');
			if(el.isInViewportReal()){
				appear(el, delay);
			}
		});
	}

	$(document).ready(function (){

		//Generales
		checkOverflow();

		//Contacto
		$('.contact input[type="text"], .contact input[type="email"], .contact textarea').focus(function(){
			$(this).parents().parent().addClass('active');		
		}).blur(function(){
			if(!$(this).val().length) {
				$(this).parents().parent().removeClass('active');
			}			
		});

		//Nav toggle
		$(document).on('click','.nav-toggle',function(){
			$('body').toggleClass('navopen');
		});

		//FadeOut body when clicking links		
		
		$('a:not(".contactme")').click(function(e) {
			e.preventDefault();
			newLocation = this.href;
			$('.precover').fadeIn().promise().done(function(){
				window.location = newLocation;
			});			
		});	


		
		
		

	}); // END DOCUMENT READY


	$(window).load(function(){

		//Inicio
		setTimeout(function(){ $('.animated h1, .animated h2, .work-content.animated p').addClass('visible') },250);
		setTimeout(function(){ $('.animated h3, .contact').addClass('visible') },750);
		setTimeout(function(){ $('.animated p').addClass('visible') },1250);
		setTimeout(function(){ $('#footer a').addClass('visible') },1750);
		if(window.innerWidth < 1015) {
			setTimeout(function(){ $('img.animated').addClass('visible') },150);
		} else {
			setTimeout(function(){ $('img.animated').addClass('visible') },1750);
		}

		showProjects();
		$(window).scroll(function(){
			showProjects();			
		});

		$('.cover').addClass('hidden');

	});
	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Wait for window to resize
	var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
	})();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	//Trigger when window is resized
	$(window).resize(function () {
		waitForFinalEvent(function(){	
			
			//Generales
			checkOverflow();

		},500, "resize");

	});//END RESIZE
	

}(window.jQuery || window.$));