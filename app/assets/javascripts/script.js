var $window, $body, winH;

// first & last mac image
var $introImg,
		$outroImg,
		topOff = 0,
		topOff2 = 0;

$(function(){

	// mobile slider
	var mySwiper = new Swiper ('.swiper-container', {
		pagination: $('.swiper-pagination'),
		paginationClickable: true,
		onTransitionStart: function(swiper) {
			$('.swiper-slide-next, .swiper-slide-prev').find('.fadeable').removeClass('fadeIn').addClass('fadeOut');
			$('.swiper-slide-active').find('.fadeable').removeClass('fadeOut').addClass('fadeIn');
			$(swiper.slides).each(function(){
				if ($(this).hasClass('swiper-slide-active')) {
					$(this).find('.appImg img').show().addClass('bounceInUp');
				}
			});
		}
	});

	$window = $(window);
	winH = $window.height();
	winW = $window.width();
	$body = $('body');
	$introImg = $('.intro');
	$outroImg = $('.tech');

	$screen1 = $('.screen1');

	//if (winW >= 768 && !Modernizr.touch) {
		
		//$('section').height($(window).height());

		init();

	//}

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
	$('.facebook').on('click', function(){
		FB.ui({
		  method: 'share',
		  href: 'http://onyxla.co/thoughts/why-i-left', //TODO: change to getdakota.com and add open graph tags
		}, function(response){});
	});
	

});

function init() {

	//topOffs();

	$window.scroll(function(){
		handleScroll();
	});

	$window.resize(function(){
		//$('section').height($(window).height());
		//topOffs();
	});

}

// handle scroll
function handleScroll() {
	
	scrolledWin = getPageScroll();
	$body.addClass('scrolling');	

	var screen2Waypoint = new Waypoint({
		element: $screen1,
		offset: 100,
		handler: function(direction) {
			$screen1.find('.screen-1-callout').addClass("bounceInUp").show();
		}
	});


	
	// show logo
	// if((scrolledWin * 1.5) > winH) {
	// 	$body.addClass('content');
	// }
	
	// show navigation 
	// if(scrolledWin > 50) {
	// 	$body.addClass('scrolled');
	// }
	
	// app img animation - commenting out for now *****
	// if(topOff >= scrolledWin) {
	// 	$introImg.removeClass('sticky');
	// } else {
	// 	$introImg.addClass('sticky');
	// }
	// if(topOff2 >= scrolledWin) {
	// 	$outroImg.removeClass('sticky');
	// } else {
	// 	$outroImg.addClass('sticky');
	// }
	
	// reset navi on top scroll
	// if(scrolledWin < winH) {
	// 	$nav.attr("class", "").addClass('a1');
	// }
		
}

// app img animation
function topOffs() {

	var addHeight = 0;
	if (winH <= 783) {
		addHeight = 100;
	}
	topOff = $introImg.position();
	topOff = topOff.top + addHeight;	
	// topOff2 = $outroImg.position();
	// topOff2 = topOff2.top;
}

// get Page scroll	
function getPageScroll() {
  var yScroll;
  if (self.pageYOffset) {
  	yScroll = self.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
  	yScroll = document.documentElement.scrollTop;
  } else if (document.body) {// all other Explorers
  	yScroll = document.body.scrollTop;
  }
  return yScroll;
}