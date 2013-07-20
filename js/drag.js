// # drag
(function ($) {
	'use strict';
	// ## Event extensions
	// Pushing dataTransfer on to the jQuery event object
	//   since we need it for setting transfer data
	$.event.props.push("dataTransfer");
	if (/firefox/i.test(navigator.userAgent)) {
		// Add normalization of offsetX and offsetY for FireFox
		var mouseDownFixHooks = $.event.fixHooks.mousedown.filter;
		$.event.fixHooks.mousedown.filter = function(event, original) {
			event = mouseDownFixHooks(event, original);
			if(!event.offsetX) {
				event.offsetX = (event.pageX - $(event.target).offset().left);
				event.offsetY = (event.pageY - $(event.target).offset().top);
			}

			return event;
		};
	}
	// Extend jQuery Event to add a stop convenience function
	$.Event.prototype.stop = function () {
		this.stopPropagation();
		this.preventDefault();
	};
	// ## Plugin
	// Define the drag plugin
	$.fn.drag = function (options) {
		// Demark this as a jQuery object
		var $this    = this,
		// Create defaults to be overriden by user options
			settings = $.extend({
				'target': 'body',
				'setData': 'Text',
				'transferEffect': 'copyMove',
				start: function (e, $el) {
					return this;
				},
				drag: function (e, $el) {
					return this;
				},
				enter: function (e, $el) {
					return this;
				},
				over: function (e, $el) {
					return this;
				},
				leave: function (e, $el) {
					return this;
				},
				drop: function (e, $el) {
					// Default behavior to update the position of the drag item
					$el.offset({
						top: e.originalEvent.pageY - $el.offsetY,
						left: e.originalEvent.pageX - $el.offsetX
					});
					return this;
				},
				end: function (e, $el) {
					return this;
				}
			}, options);
		// ## API
		// Define API after optional overrides
		$this.start = settings.start;
		$this.drag  = settings.drag;
		$this.enter = settings.enter;
		$this.over  = settings.over;
		$this.leave = settings.leave;
		$this.drop  = settings.drop;
		$this.end   = settings.end;
		// ## Drop Target
		// Add event handlers to the drop target and
        //    scope the callbacks to be on this instead of the drop target
		$(settings.target)
			.on('dragenter', function (e) {
				e.stop();
				$this.enter.call($this, e, $this);
				return false;
			})
			.on('dragover', function (e) {
				e.preventDefault();
				// Set the drop effect to the allowed transfer effect
				// TODO: Test the hell out of this
				e.dataTransfer.dropEffect = settings.transferEffect;
				$this.over.call($this, e, $this);
				return false;
			})
			.on('dragleave', function (e) {
				e.stopPropagation();
				$this.leave.call($this, e, $this);
			})
			.on('drop', function (e) {
				e.stop();
				$this.drop.call($this, e, $this);
				return false;
			});
		// ## Drag element
		// Add event handlers to this
        //    and call the api callbacks
		$this
			.mousedown(function (e) {
				e.stopPropagation();
				// Enable browser dragging
				this.draggable = true;
				// Save intitial mouse offset on this
				$this.offsetX = e.offsetX || 0;
				$this.offsetY = e.offsetY || 0;
			})
			// Set the dataTransfer options
			.on('dragstart', function (e) {
				e.stopPropagation();
				e.dataTransfer.effectAllowed = settings.transferEffect;
				e.dataTransfer.setData(settings.setData, $this.id);
				$this.start.call($this, e, $this);
			})
			.on('drag', function (e) {
				$this.drag.call($this, e, $this);
			})
			// Disable browser dragging at the end of the drag operation
			.on('dragend', function (e) {
				e.stopPropagation();
				this.draggable = false;
				$this.end.call($this, e, $this);
			});

		return $this;
	};

}(jQuery));
