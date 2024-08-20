/**
 * Zoomify
 * A jQuery plugin for simple lightboxes with zoom effect.
 * http://indrimuska.github.io/zoomify
 *
 * (c) 2015 Indri Muska - MIT
 */
; (function ($) {

	// initialization
	Zoomify = function (element, options) {
		var that = this;

		this._zooming = false;
		this._zoomed = false;
		this._timeout = null;
		this.$shadow = null;
		this._rotation = 0;
		this._lastTransformScale = null;
		this.$image = $(element).addClass('zoomify');
		this.options = $.extend({}, Zoomify.DEFAULTS, this.$image.data(), options);

		this.$image.on('click', function () { that.zoom(); });
		$(window).on('resize', function () { that.reposition(); });
		$(document).on('scroll', function () { that.reposition(); });
		// $(window).on('keyup', function (e) {
		// 	if (that._zoomed && e.keyCode == 27)
		// 		that.zoomOut();
		// });
	};
	Zoomify.DEFAULTS = {
		duration: 200,
		easing: 'linear',
		scale: 0.9
	};

	// css utilities
	Zoomify.prototype.transition = function ($element, value) {
		$element.css({
			'-webkit-transition': value,
			'-moz-transition': value,
			'-ms-transition': value,
			'-o-transition': value,
			'transition': value
		});
	};
	Zoomify.prototype.addTransition = function ($element) {
		this.transition($element, 'all ' + this.options.duration + 'ms ' + this.options.easing);
	};
	Zoomify.prototype.removeTransition = function ($element, callback) {
		var that = this;

		clearTimeout(this._timeout);
		this._timeout = setTimeout(function () {
			that.transition($element, '');
			if ($.isFunction(callback)) callback.call(that);
		}, this.options.duration);
	};
	Zoomify.prototype.transform = function (value) {
		this.$image.css({
			'-webkit-transform': value,
			'-moz-transform': value,
			'-ms-transform': value,
			'-o-transform': value,
			'transform': value
		});
	};
	Zoomify.prototype.transformScaleAndTranslate = function (scale, translateX, translateY, callback, rotate) {
		this.addTransition(this.$image);
		this._lastTransformScale = 'scale(' + scale + ') translate(' + translateX + 'px, ' + translateY + 'px)';
		this.transform(this._lastTransformScale);
		this.removeTransition(this.$image, callback);
	};
	// rotate functions
	Zoomify.prototype.rotate = function () {
		this.transform(this._lastTransformScale + ' rotate(' + this._rotation + 'deg)');
	}

	Zoomify.prototype.rotateLeft = function () {
		this.$image.trigger('rotate-left.zoomify');
		this._rotation -= 90;
		this.rotate();
		this.$image.trigger('rotate-left-complete.zoomify');
	}
	Zoomify.prototype.rotateRight = function () {
		this.$image.trigger('rotate-left.zoomify');
		this._rotation += 90;
		this.rotate();
		this.$image.trigger('rotate-left-complete.zoomify');
	}

	// zooming functions
	Zoomify.prototype.zoom = function () {
		if (this._zooming) return;

		if (this._zoomed) this.zoomOut();
		else this.zoomIn();
	};
	Zoomify.prototype.zoomIn = function () {
		var that = this,
			transform = this.$image.css('transform');

		this.transition(this.$image, 'none');
		this.transform('none');

		var offset = this.$image.offset(),
			width = this.$image.outerWidth(),
			height = this.$image.outerHeight(),
			nWidth = this.$image[0].naturalWidth || +Infinity,
			nHeight = this.$image[0].naturalHeight || +Infinity,
			wWidth = $(window).width(),
			wHeight = $(window).height(),
			scaleX = Math.min(nWidth, wWidth * this.options.scale) / width,
			scaleY = Math.min(nHeight, wHeight * this.options.scale) / height,
			scale = Math.min(scaleX, scaleY),
			translateX = (-offset.left + (wWidth - width) / 2) / scale,
			translateY = (-offset.top + (wHeight - height) / 2 + $(document).scrollTop()) / scale;

		this.transform(transform);
		this._zooming = true;
		this.$image.addClass('zoomed').trigger('zoom-in.zoomify');
		setTimeout(function () {
			that.addShadow();
			that.transformScaleAndTranslate(scale, translateX, translateY, function () {
				that._zooming = false;
				that.$image.trigger('zoom-in-complete.zoomify');
			}, that._rotation);
			that._zoomed = true;
		});
	};
	Zoomify.prototype.zoomOut = function () {
		var that = this;

		this._zooming = true;
		this.$image.trigger('zoom-out.zoomify');
		this.transformScaleAndTranslate(1, 0, 0, function () {
			that._zooming = false;
			that.$image.removeClass('zoomed').trigger('zoom-out-complete.zoomify');
		});
		this.removeShadow();
		this._zoomed = false;
	};

	// page listener callbacks
	Zoomify.prototype.reposition = function () {
		if (this._zoomed) {
			this.transition(this.$image, 'none');
			this.zoomIn();
		}
	};

	// shadow background
	Zoomify.prototype.addShadow = function () {
		var that = this;
		if (this._zoomed) return;

		if (that.$shadow) that.$shadow.remove();
		this.$shadow = $(
			'<div class="zoomify-shadow">' +
			'<div class="zoomify-options">' +
			'	<span id="zoomify-rotate-left"><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"><path d="M12.0769 19C13.5389 19 14.9634 18.532 16.1462 17.6631C17.329 16.7942 18.2094 15.569 18.6612 14.1631C19.1129 12.7572 19.1129 11.2428 18.6612 9.83688C18.2094 8.43098 17.329 7.20578 16.1462 6.33688C14.9634 5.46798 13.5389 5 12.0769 5C10.6149 5 9.19043 5.46799 8.00764 6.33688C6.82485 7.20578 5.94447 8.43098 5.49268 9.83688C5.0409 11.2428 5.0409 12.7572 5.49269 14.1631M6.5 12.7778L5.53846 14.3333L4 13.1667" stroke="#464455" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
			'	<span id="zoomify-rotate-right"><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"><path d="M11.9231 19C10.4611 19 9.03659 18.532 7.85379 17.6631C6.671 16.7942 5.79063 15.569 5.33884 14.1631C4.88705 12.7572 4.88705 11.2428 5.33884 9.83688C5.79063 8.43098 6.671 7.20578 7.8538 6.33688C9.03659 5.46798 10.4611 5 11.9231 5C13.3851 5 14.8096 5.46799 15.9924 6.33688C17.1752 7.20578 18.0555 8.43098 18.5073 9.83688C18.9591 11.2428 18.9591 12.7572 18.5073 14.1631M17.5 12.7778L18.4615 14.3333L20 13.1667" stroke="#464455" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
			'</div>' +
			'</div>');
		$('body').append(this.$shadow);
		this.addTransition(this.$shadow);
		this.$shadow.on('click', function () { that.zoomOut(); })
		$("#zoomify-rotate-left").on('click', function () { that.rotateLeft(); return false; })
		$("#zoomify-rotate-right").on('click', function () { that.rotateRight(); return false; })

		setTimeout(function () { that.$shadow.addClass('zoomed'); }, 10);
	};
	Zoomify.prototype.removeShadow = function () {
		var that = this;
		if (!this.$shadow) return;

		this.addTransition(this.$shadow);
		this.$shadow.removeClass('zoomed');
		this.$image.one('zoom-out-complete.zoomify', function () {
			if (that.$shadow) that.$shadow.remove();
			that.$shadow = null;
		});
	};

	// plugin definition
	$.fn.zoomify = function (option) {
		return this.each(function () {
			var $this = $(this),
				zoomify = $this.data('zoomify');

			if (!zoomify) $this.data('zoomify', (zoomify = new Zoomify(this, typeof option == 'object' && option)));
			if (typeof option == 'string' && ['zoom', 'zoomIn', 'zoomOut', 'reposition'].indexOf(option) >= 0) zoomify[option]();
		});
	};

})(jQuery);