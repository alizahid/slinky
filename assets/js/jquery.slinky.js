/*
 * Slinky
 * A light-weight, responsive, mobile-like navigation menu plugin for jQuery
 * Built by Ali Zahid <ali.zahid@live.com>
 * Published under the MIT license
 */

;(function($) {
	var lastClick;

	$.fn.slinky = function(options) {
		var settings = $.extend({
			label: 'Back',
			title: false,
			speed: 300,
			resize: true,
			activeClass: 'active',
			headerClass: 'header',
			headingTag: '<h2>',
			backFirst: false,
		}, options);

		var menu = $(this),
			root = menu.children().first();

		menu.addClass('slinky-menu');

		var move = function(depth, callback) {
			var left = Math.round(parseInt(root.get(0).style.left)) || 0;

			root.css('left', left - (depth * 100) + '%');

			if (typeof callback === 'function') {
				setTimeout(callback, settings.speed);
			}
		};

		var resize = function(content) {
			menu.height(content.outerHeight());
		};

		var transition = function(speed) {
			menu.css('transition-duration', speed + 'ms');
			root.css('transition-duration', speed + 'ms');
		};

		transition(settings.speed);

		$('a + ul', menu).prev().addClass('next');

		$('li > ul', menu).prepend('<li class="' + settings.headerClass + '">');

		if (settings.title === true) {
			$('li > ul', menu).each(function() {
				var label = $(this).parent().find('a').first().text(),
					title = $(settings.headingTag).text(label);

				$('> .' + settings.headerClass, this).append(title);
			});
		}

		if (!settings.title && settings.label === true) {
			$('li > ul', menu).each(function() {
				var label = $(this).parent().find('a').first().text(),
					backLink = $('<a>').text(label).prop('href', '#').addClass('back');

				if (settings.backFirst) {
					$('> .' + settings.headerClass, this).prepend(backLink);
				} else {
					$('> .' + settings.headerClass, this).append(backLink);
				}
			});
		} else {
			var backLink = $('<a>').text(settings.label).prop('href', '#').addClass('back');

			if (settings.backFirst) {
				$('.' + settings.headerClass, menu).prepend(backLink);
			} else {
				$('.' + settings.headerClass, menu).append(backLink);
			}
		}

		$('a', menu).on('click', function(e) {
			if ((lastClick + settings.speed) > Date.now()) {
				return false;
			}

			lastClick = Date.now();

			var a = $(this);

			if (/\B#/.test(this.href) || a.hasClass('next') || a.hasClass('back')) {
				e.preventDefault();
			}

			if (a.hasClass('next')) {
				menu.find('.' + settings.activeClass).removeClass(settings.activeClass);

				a.next().show().addClass(settings.activeClass);

				move(1);

				if (settings.resize) {
					resize(a.next());
				}
			} else if (a.hasClass('back')) {
				move(-1, function() {
					menu.find('.' + settings.activeClass).removeClass(settings.activeClass);

					a.parent().parent().hide().parentsUntil(menu, 'ul').first().addClass(settings.activeClass);
				});

				if (settings.resize) {
					resize(a.parent().parent().parentsUntil(menu, 'ul'));
				}
			}
		});

		this.jump = function(to, animate) {
			to = $(to);

			var active = menu.find('.' + settings.activeClass);

			if (active.length > 0) {
				active = active.parentsUntil(menu, 'ul').length;
			} else {
				active = 0;
			}

			menu.find('ul').removeClass(settings.activeClass).hide();

			var menus = to.parentsUntil(menu, 'ul');

			menus.show();
			to.show().addClass(settings.activeClass);

			if (animate === false) {
				transition(0);
			}

			move(menus.length - active);

			if (settings.resize) {
				resize(to);
			}

			if (animate === false) {
				transition(settings.speed);
			}
		};

		this.home = function(animate) {
			if (animate === false) {
				transition(0);
			}

			var active = menu.find('.' + settings.activeClass),
				count = active.parentsUntil(menu, 'li').length;

			if (count > 0) {
				move(-count, function() {
					active.removeClass(settings.activeClass);
				});

				if (settings.resize) {
					resize($(active.parentsUntil(menu, 'li').get(count - 1)).parent());
				}
			}

			if (animate === false) {
				transition(settings.speed);
			}
		};

		this.destroy = function() {
			$('.' + settings.headerClass, menu).remove();
			$('a', menu).removeClass('next').off('click');

			menu.removeClass('slinky-menu').css('transition-duration', '');
			root.css('transition-duration', '');
		};

		var active = menu.find('.' + settings.activeClass);

		if (active.length > 0) {
			active.removeClass(settings.activeClass);

			this.jump(active, false);
		}

		return this;
	};
}(jQuery));
