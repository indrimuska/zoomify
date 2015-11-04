/**
 * Zoomify
 * A jQuery plugin for simple lightboxes with zoom effect.
 * http://indrimuska.github.io/zoomify
 *
 * (c) 2015 Indri Muska - MIT
 */
;(function($){
	
	function Zoomify() {
		defaults = {
			delay:  200,
			easing: 'linear',
			scale:  0.9
		};
		this._zoomed  = false;
		this._timeout = null;
		this.$shadow  = null;
	};
	
	// initialization
	Zoomify.prototype.init = function (element, settings) {
		var that = this;
		
		this.$image  = $(element).addClass('zoomify');
		this.options = $.extend({}, defaults, settings);
		
		this.$image.on('click', function () { that.zoom(); });
		$(window).on('resize', function () { that.reposition(); });
		$(document).on('scroll', function () { that.reposition(); });
	};
	
	// css utilities
	Zoomify.prototype.transition = function (value, $element) {
		($element || this.$image).css({
			'-webkit-transition': value,
			'-moz-transition': value,
			'-ms-transition': value,
			'-o-transition': value,
			'transition': value
		});
	};
	Zoomify.prototype.addTransition = function ($element) {
		this.transition('all ' + this.options.delay + 'ms ' + this.options.easing, $element);
	};
	Zoomify.prototype.removeTransitionAfterTransition = function ($element) {
		var that = this;
		
		clearTimeout(this._timeout);
		this._timeout = setTimeout(function () {
			that.transition('', $element);
		}, this.options.delay);
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
	Zoomify.prototype.doTransform = function (scale, translateX, translateY) {
		this.addTransition();
		this.transform('scale(' + scale + ') translate(' + translateX + 'px, ' + translateY + 'px)');
		this.removeTransitionAfterTransition();
	};
	
	// zooming functions
	Zoomify.prototype.zoom = function () {
		if (this._zoomed) this.zoomOut();
		else this.zoomIn();
	};
	Zoomify.prototype.zoomIn = function () {
		var that      = this,
			transform = this.$image.css('transform');
		
		this.transform('none');
		this.transition('none');
		this.$image.addClass('zoomed');
		
		var offset     = this.$image.offset(),
			width      = this.$image.outerWidth(),
			height     = this.$image.outerHeight(),
			wWidth     = $(window).width(),
			wHeight    = $(window).height(),
			scaleX     = wWidth / width,
			scaleY     = wHeight / height,
			scale      = Math.min(scaleX, scaleY) * this.options.scale,
			translateX = (-offset.left + (wWidth - width) / 2) / scale,
			translateY = (-offset.top + (wHeight - height) / 2 + $(document).scrollTop()) / scale;
		
		this.transform(transform);
		
		setTimeout(function () {
			that.addShadow();
			that.doTransform(scale, translateX, translateY);
			that._zoomed = true;
		});
	};
	Zoomify.prototype.zoomOut = function () {
		this.$image.removeClass('zoomed');
		this.doTransform(1, 0, 0);
		this.removeShadow();
		this._zoomed = false;
	};
	
	// page listener callbacks
	Zoomify.prototype.reposition = function () {
		if (this._zoomed) {
			this.transition('none');
			this.zoomIn();
		}
	};
	
	// shadow background
	Zoomify.prototype.addShadow = function () {
		var that = this;
		if (this.$shadow) return;
		
		this.$shadow = $('<div class="zoomify-shadow"></div>');
		$('body').append(this.$shadow);
		this.addTransition(this.$shadow);
		this.$shadow.on('click', function () { that.zoomOut(); })
		
		setTimeout(function () { that.$shadow.addClass('zoomed'); }, 10);
	};
	Zoomify.prototype.removeShadow = function () {
		var that = this;
		
		this.addTransition(this.$shadow);
		this.$shadow.removeClass('zoomed');
		
		setTimeout(function () {
			that.$shadow.remove();
			that.$shadow = null;
		}, this.options.delay);
	};
	
	// plugin definition
	$.fn.zoomify = function (settings) {
		this.each(function () {
			var zoomify = new Zoomify();
			zoomify.init(this, settings);
		});
		return this;
	};
	
})(jQuery);