// var path = document.querySelector('.path');
// var length = path.getTotalLength();
console.log("myJS");

(function () {
	window.signature = {
		initialize: function () {
			return $('.signature svg').each(function () {
				var delay, i, len, length, path, paths, 
				previousStrokeLength, results, speed, speed_down;
				console.log(this);
				paths = $('path, circle, rect', this);
				delay = 0;
				results = [];
				speed_down = 250;
				for (i = 0, len = paths.length; i < len; i++) {
					// if (window.CP.shouldStopExecution(1)) {
					// 	break;
					// }
					path = paths[i];
					length = path.getTotalLength();
					previousStrokeLength = speed || 0;
					speed = length < 100 ? 20 : Math.floor(length);
					speed += speed_down;
					delay += previousStrokeLength + 100;
					results.push($(path).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length));
				}
				// window.CP.exitedLoop(1);
				return results;
			});
		},
		animate: function () {
			return $('.signature svg').each(function () {
				var delay, i, len, length, path, paths, results, speed;
				paths = $('path, circle, rect', this);
				results = [];
				for (i = 0, len = paths.length; i < len; i++) {
					// if (window.CP.shouldStopExecution(2)) {
					// 	break;
					// }
					path = paths[i];
					length = $(path).attr('data-length');
					speed = $(path).attr('data-speed');
					delay = $(path).attr('data-delay');
					results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
				}
				// window.CP.exitedLoop(2);
				return results;
			});
		}
	};
	$(document).ready(function () {
		window.signature.initialize();
		return setInterval( function () {
			window.signature.initialize();
			return setTimeout(function () {
				return window.signature.animate();
			}, 2000);
		}, 9000);
		// setInterval(function(){
		// 	window.signature.initialize();
		// 	window.signature.animate();
		// }, 3000);


	});
	$(window).load(function () {
		return window.signature.animate();
	});

	$('#gamburger').on('click', function() {
		// console.log('test');
		$(this).toggleClass('form-show');
		$('#you-form').toggle();
	});

<<<<<<< HEAD
	// $("button").click(function(){
	// 		console.log('mypost');
 //        $.post("/",
 //        {
 //          name: "Donald Duck",
 //          city: "Duckburg",
 //        },
 //        function(data,status){
 //            alert("Data: " + data + "\nStatus: " + status);
 //        });
 //    });

 	$
=======
>>>>>>> f22b403b26accd7248a77bbb6e9df6ae6e5ce660

	// $('form').submit(function(){
	// 		console.log('mypost');
	// 		console.log( $("#g-recaptcha-response").val());
 //        $.post("/",
 //        {
 //          name: "Donald Trump",
 //          city: "Duckburg",
 //          gRecRes: $("#g-recaptcha-response").val()
 //        },
 //        function(data,status){
 //            alert("Data: " + data + "\nStatus: " + status);
 //        });
 //    });


	// Parallax
	console.log('trace');
	vhconst = window.outerHeight;
	var bg_size = '.head';

	$(window).resize(function(){
		console.log('resize');
		console.log(window.height);
		vhconst = window.outerHeight;
		$(bg_size).css({
			'backgroundSize' : 'auto ' + vhconst + 'px'
		});
	})

	$(window).on("orientationchange",function(){
		vhconst = window.outerHeight;
		$(bg_size).css({
			'backgroundSize' : 'auto ' + vhconst + 'px'
		});
	});

	// Parall
	var head = $('.head').scrollTop();
	$(window).scroll(function() {
		var wscroll = $(this).scrollTop();
		$('.head h1').css({
			'transform' : 'translate(0px, '+ wscroll/1.5 + '%)'
		});
		$('.head p').css({
			'transform' : 'translateY(' + wscroll/1.2 + '%) '//scale(' + (1.7 - 1/(wscroll+1.3)) +')'
		});

		// $('.footer').css({
		// 	'transform' : 'translateY(' + wscroll*1.2 + 'px) '//scale(' + (1.7 - 1/(wscroll+1.3)) +')'
		// });

		var ftop = $('.footer').offset().top;
		// console.log(ftop);
		if (wscroll+1000 > ftop - vhconst) {
			console.log(wscroll-ftop);
			$('.footer').css({'background-position' : 'center' +
				(wscroll - ftop) + 'px'});
		}

		$(bg_size).css({
			'backgroundSize' : 'auto ' + (vhconst*(1+(wscroll*0.3/vhconst))) + 'px'
		});

	});

}.call(this));


