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
}.call(this));