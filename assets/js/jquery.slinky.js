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

		$('li > ul', menu).prepend('<li class="header">');

		if (settings.title === true) {
			$('li > ul', menu).each(function() {
				var label = $(this).parent().find('a').first().text(),
					title = $('<h2>').text(label);

				$('> .header', this).append(title);
			});
		}

		if (!settings.title && settings.label === true) {
			$('li > ul', menu).each(function() {
				var label = $(this).parent().find('a').first().text(),
					backLink = $('<a>').text(label).prop('href', '#').addClass('back');

				$('> .header', this).append(backLink);
			});
		} else {
			var backLink = $('<a>').text(settings.label).prop('href', '#').addClass('back');

			$('.header', menu).append(backLink);
		}

		$('a', menu).on('click', function(e) {
			if ((lastClick + settings.speed) > Date.now()) {
				return;
			}

			lastClick = Date.now();

			var a = $(this);

			if (/#/.test(this.href)) {
				e.preventDefault();
			}

			if (a.hasClass('next')) {
				menu.find('.active').removeClass('active');

				a.next().show().addClass('active');

				move(1);

				if (settings.resize) {
					resize(a.next());
				}
			} else if (a.hasClass('back')) {
				move(-1, function() {
					menu.find('.active').removeClass('active');

					a.parent().parent().hide().parentsUntil(menu, 'ul').first().addClass('active');
				});

				if (settings.resize) {
					resize(a.parent().parent().parentsUntil(menu, 'ul'));
				}
			}
		});

		this.jump = function(to, animate) {
			to = $(to);

			var active = menu.find('.active');

			if (active.length > 0) {
				active = active.parentsUntil(menu, 'ul').length;
			} else {
				active = 0;
			}

			menu.find('ul').removeClass('active').hide();

			var menus = to.parentsUntil(menu, 'ul');

			menus.show();
			to.show().addClass('active');

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

			var active = menu.find('.active'),
				count = active.parentsUntil(menu, 'li').length;

			if (count > 0) {
				move(-count, function() {
					active.removeClass('active');
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
			$('.header', menu).remove();
			$('a', menu).removeClass('next').off('click');

			menu.removeClass('slinky-menu').css('transition-duration', '');
			root.css('transition-duration', '');
		};

		var active = menu.find('.active');

		if (active.length > 0) {
			active.removeClass('active');

			this.jump(active, false);
		}

		return this;
	};
}(jQuery));
