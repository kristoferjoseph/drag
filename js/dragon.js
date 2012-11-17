/*global console: false*/
(function ($) {
	'use strict';

	$.Event.prototype.stop = function (	) {
		this.stopPropagation();
		this.preventDefault();
	};

	$.fn.dragon = function (options) {
		var $this = this,
			offsetX, offsetY;

		var settings = $.extend({
			'target': 'body',
			'setData': 'Text',
			'effectAllowed': 'copyMove',
			'start': function (e, $el) {
				console.log("Start", e, $el);
				return this;
			},
			'drag': function (e, $el) {
				console.log("Drag", e, $el);
				return this;
			},
			'enter': function (e, $el) {
				console.log("Enter", e, $el);
				return this;
			},
			'leave': function (e, $el) {
				console.log("Leave", e, $el);
				return this;
			},
			'drop': function (e, $el) {
				console.log("Drop", e, $el);
				return this;
			},
			'end': function (e, $el) {
				console.log("End", e, $el);
				return this;
			}
		}, options);

		$this.start = settings.start;
		$this.drag = settings.drag;
		$this.enter = settings.enter;
		$this.leave = settings.leave;
		$this.drop = settings.drop;
		$this.end = settings.end;

		$(settings.target)
			.on('dragenter', function (e) {
				e.stop();
				$this.enter.call($this, e, $this);
			})
			.on('dragleave', function (e) {
				e.stop();
				$this.leave.call($this, e, $this);
			})
			.on('drop', function (e) {
				e.stop();
				$this.drop.call($this, e, $this);
			});

		$this
			.mousedown(function (e) {
				e.stopPropagation();
				this.draggable = true;
				$this.offsetX = e.offsetX;
				$this.offsetY = e.offsetY;
			})
			.on('dragstart', function (e) {
				e.stopPropagation();
				e.dataTransfer.setData(settings.setData, this.id);
				e.dataTransfer.effectAllowed = settings.effectAllowed;

				$this.start.call($this, e, $this);
			})
			.on('drag', function (e) {
				$this.drag.call($this, e, $this);
			})
			.on('dragend', function (e) {
				e.stopPropagation();
				this.draggable = false;
				$this.end.call($this, e, $this);
			});

		return $this;
	};

}(jQuery));
