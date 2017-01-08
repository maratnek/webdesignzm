;
var slideIndex = 1;
// showDivs(slideIndex);

// function currentDiv(n) {
//   showDivs(slideIndex = n);
// }

// function showDivs(n) {
// 	var i;
// 	var x = document.getElementsByClassName("mySlides");
// 	var dots = document.getElementsByClassName("demo");
// 	if (n > x.length) {slideIndex = 1}    
// 	if (n < 1) {slideIndex = x.length;}
// 	for (i = 0; i < x.length; i++) {
// 		x[i].style.display = "none";  
// 	}
// 	for (i = 0; i < dots.length; i++) {
// 		dots[i].className = dots[i].className.replace(" w3-white", "");
// 	}
// 	x[slideIndex-1].style.display = "block";  
// 	dots[slideIndex-1].className += " w3-white";
// };

// function carousel() {
// 	var i;
// 	var x = document.getElementsByClassName("mySlides");
// 	for (i = 0; i < x.length; i++) {
// 		x[i].style.display = "none"; 
// 		x[i].className = x[i].className.replace(" slider_size", ""); 
// 	}
// 	if (slideIndex == x.length+1)
// 	{
// 		var disp = document.getElementsByClassName("image_all");
// 		for (i = 0; i < disp.length; i++)
// 			disp[i].style.display = "block";
// 		return;
// 	}

// 	x[slideIndex-1].style.display = "block"; 
// 	x[slideIndex-1].className += " slider_size"; 
// 	// Span Show 
// 	// var dots = document.getElementsByClassName("demo");
// 	// for (i = 0; i < dots.length; i++) {
// 	// 	dots[i].className = dots[i].className.replace(" w3-white", "");
// 	// }
// 	// dots[slideIndex-1].className += " w3-white";
// 	slideIndex++;
// 	setTimeout(carousel, 4000);
// };
// carousel();

(function ($) {
	var slider_images;	
	var slideIndex;

	var csl = function(){
		console.log(slider_images);
		slider_images.removeClass('slider_size');
		slider_images.hide();
		if (slideIndex == slider_images.length+1)
		{
			$('.image_all').show();
			return;
		}
		slider_images.eq(slideIndex-1).addClass('slider_size').show();
		slideIndex++;
		setTimeout(csl, 4000);
	}


	$.fn.carousel = function(){
		slider_images = $(this);
		console.log(slider_images.length);
		if (slider_images.length == 0)
			return;
		slideIndex = 1;
		csl();
		return $(this);
	}
})(jQuery)


// $('.techTaskSlides').carousel();
// $('.prototypeSlides').carousel();