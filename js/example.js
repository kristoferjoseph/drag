(function($) {

	$('.box').drag({
		target: '.drop-target',
		start: function (e, $el) {
			console.log("Start", e, $el);
			return this;
		},
		drag: function (e, $el) {
			// console.log("Drag", e, $el);
			return this;
		},
		enter: function (e, $el) {
			console.log("Enter", e, $el);
			return this;
		},
		leave: function (e, $el) {
			console.log("Leave", e, $el);
			return this;
		},
		// Default behavior is to update drag item position
		//    uncomment this to override
		// drop: function (e, $el) {
		// 	console.log("Drop", e, $el);
		// 	return this;
		// },
		end: function (e, $el) {
			console.log("End", e, $el);
			return this;
		}
	});


}(jQuery));