var $window, winW, winH, isSliderInit;

$(function(){

	$window = $(window);

	init();

});

function init() {

	winW = viewport().width;
	winH = viewport().height;

	if (winW < 1024 || Modernizr.touch) {

		initSlider();

	}

	var line = new Vivus('line', {type: 'scenario', start: 'inViewport', forceRender: false});

	$('.header a').on('click', function(){
		var textHeight = $('.fix-text').outerHeight();
		if (winW < 1024 || Modernizr.touch) {
			$('html, body').animate({
        scrollTop: $(".fix").offset().top - 60
    	}, 2000);
		} else {
			$('html, body').animate({
        scrollTop: $(".fix").offset().top + 150
    	}, 2000);
		}
	});

	socialSetup();

	subscribeSetup();

	adjustScreen();

	$window.resize(function(){

		adjustScreen();
		
	});

}

function socialSetup() {

	$('.tech-link').on('click', function(){

		var textHeight = $('.tech-text').outerHeight();

    $('html, body').animate({
        scrollTop: $("#techs").offset().top - ((winH - textHeight - 60) / 2)
    }, 2000);

	});

	$('.request-link').on('click', function(){
		$('html, body').animate({
        scrollTop: $(".request").offset().top
    }, 2000);
	});

	// twitter
	$('.twitter').on('click', function() {
		var width  = 660,
				height = 400,
				left 	 = ($(window).width() - width) / 2,
				top    = ($(window).height() - height) / 2,
				url    = this.href,
				opts   = 'status=1' +
								 ',width='  + width  +
								 ',height=' + height +
								 ',top='	  + top    +
								 ',left='   + left;

		window.open(url, 'twitter', opts);

		return false;
	});

	// facebook
	$('.facebook').on('click', function(e){
		e.preventDefault();
		FB.ui({
		  method: 'share',
		  href: 'http://onyxla.co/thoughts/why-i-left', //TODO: change to getdakota.com and add open graph tags
		}, function(response){});
	});

	$("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-fade-screen, .modal-close, .cancel-email").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
    $('#send-email').val('');
    $('.modal-content textarea').val('');
    $('.share-email-flash').text('');
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });

  var divError = $('.share-email-flash'),
			button   = $('input.send-email');

  $('form#share-email').submit(function(){
		$(this).unbind('submit')
			.bind("ajax:beforeSend", function(evt, xhr, settings){
				button.data('origText', button.val());
				button.val('Sending...');
			})
			.bind("ajax:success", function(evt, data, status, xhr){
				if (data.message == "success"){
					divError.html('Thanks for sharing!').css('color', '#4F8A10');
					button.val(button.data('origText'));
				} else {
					divError.html(data.message);
					button.val(button.data('origText'));
				}
			})
			.bind("ajax:error", function(evt, xhr, status, error){
				divError.html("Oops, something went wrong. Please reload the page and try again.")
				button.val(button.data('origText'));
			});
	});

}

function subscribeSetup() {
	// request an invite form submit
	var divError = $('span.error'),
			button   = $('input.request');
	
	$('form#subscribe').submit(function(){
		$(this).unbind('submit')
			.bind("ajax:beforeSend", function(evt, xhr, settings){
				button.data('origText', button.val());
				button.val('Requesting...');
			})
			.bind("ajax:success", function(evt, data, status, xhr){
				if (data.message == "success"){
					$('.request-wrapper').fadeOut(500);
					$('.request-success').delay(500).fadeIn(1000);
				} else {
					divError.html(data.message).css('visibility', 'visible');
					button.val(button.data('origText'));
				}
			})
			.bind("ajax:error", function(evt, xhr, status, error){
				divError.html("Oops, something went wrong. Please reload the page and try again.")
				button.val(button.data('origText'));
			});
	});
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function adjustScreen() {

	winH = $window.height();
	winW = viewport().width;

	if (winW >= 1024) {

		$('.screen.slides-wrapper, .slider-nav').hide();

		var s = skrollr.init({
			forceHeight: false
		});
		
		setTimeout(function(){
			var screenH = $('.screens').outerHeight(),
					bottom = 0;

			bottom = ((((winH - screenH + 60) / winH) * 100) / 2) - 2;

			$('.screens').attr('data--10p-top-top', 'bottom: ' + bottom + 'vh;');
			$('.screens').attr('data-0-bottom-bottom', 'bottom: ' + bottom + 'vh;');
			$('.screens').attr('style', 'bottom: ' + bottom + 'vh;');
			s.refresh();

		}, 500);

	} else {
		var s = skrollr.init();
		s.destroy();
		$('.screen.slides-wrapper, .slider-nav').show();
		$('.text-node').attr('style', '');
		if (!isSliderInit) {
			initSlider();
		}

		var screenWidth = $('.screens').width();
		$('.slides div img').width(screenWidth * .875);
	}

	if (Modernizr.touch) {
		var s = skrollr.init();
		s.destroy();
		$('.screen.slides-wrapper, .slider-nav').show();
		$('.text-node').attr('style', '');
		if (!isSliderInit) {
			initSlider();
		}
	}

}

function initSlider() {

	var slidesArray = $('.slides div'),
			textArray = $('.text-wrapper div');

	var autoPlay = setInterval(function(){
		startAutoPlay();
	}, 4000);

	$('.slider-nav span').on('click', function() {
		var slideIndex = $(this).data('index');

		$(this).addClass('active').siblings().removeClass('active');

		$.each(slidesArray, function(index, value){
			if (slideIndex == index) {
				$(this).addClass('active').siblings().removeClass('active');
			}
		});

		$.each(textArray, function(index, value){
			if (slideIndex == index) {
				$(this).addClass('active').siblings().removeClass('active');
			}
		});

		clearInterval(autoPlay);

		autoPlay = setInterval(function(){
			startAutoPlay();
		}, 4000);

	});

	isSliderInit = true;

}

function startAutoPlay() {
	var currentSlide = $('.slides div.active'),
			currentText = $('.text-wrapper div.active'),
			currentMarker = $('.slider-nav span.active');

	if (currentSlide.is(':last-child')) {
		$('.slides div:first-child, .text-wrapper div:first-child, .slider-nav span:first-child').addClass('active').siblings().removeClass('active');
	} else {
		currentSlide.removeClass('active').next().addClass('active');
		currentText.removeClass('active').next().addClass('active');
		currentMarker.removeClass('active').next().addClass('active');
	}
}