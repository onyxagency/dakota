var $window, $body, winH;

// first & last mac image
var $introImg,
		$outroImg,
		topOff = 0,
		topOff2 = 0;

$(function(){


 var mySwiper = new Swiper ('.swiper-container');

	$window = $(window);
	winH = $window.height();
	winW = $window.width();
	$body = $('body');
	$introImg = $('.screen1');
	$outroImg = $('.tech');

	if (winW >= 768 && !Modernizr.touch) {
		
		$('section').height($(window).height());
		console.log("in");
		init();

	}



});

function init() {

	topOffs();

	$window.scroll(function(){
		handleScroll();
	});

	$window.resize(function(){
		//$('section').height($(window).height());
		topOffs();
	});

}

// handle scroll
function handleScroll() {
	
	scrolledWin = getPageScroll();
	$body.addClass('scrolling');	
	
	// show logo
	// if((scrolledWin * 1.5) > winH) {
	// 	$body.addClass('content');
	// }
	
	// show navigation 
	// if(scrolledWin > 50) {
	// 	$body.addClass('scrolled');
	// }
	
	// app img animation
	if(topOff >= scrolledWin) {
		$introImg.removeClass('sticky');
	} else {
		$introImg.addClass('sticky');
	}
	if(topOff2 >= scrolledWin) {
		$outroImg.removeClass('sticky');
	} else {
		$outroImg.addClass('sticky');
	}
	
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