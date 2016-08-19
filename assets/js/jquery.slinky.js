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
			resize: true
		}, options);

		var move = function(menu, next, callback) {
			var left = Math.round(parseInt(menu.get(0).style.left)) || 0;

			menu.css('left', -Math.abs(next ? left - 100 : left + 100) + '%');

			if (typeof callback === 'function') {
				setTimeout(callback, settings.speed);
			}
		};

		var resize = function(menu, content) {
			menu.height(content.outerHeight());
		};

		return this.each(function() {
			var menu = $(this),
				root = menu.children().first();

			menu.css('transition-duration', settings.speed + 'ms');
			root.css('transition-duration', settings.speed + 'ms');

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
					a.next().show();

					move(root, true);

					if (settings.resize) {
						resize(menu, a.next());
					}
				} else if (a.hasClass('back')) {
					move(root, false, function() {
						a.parent().parent().hide();
					});

					if (settings.resize) {
						resize(menu, a.parent().parent().parents('ul'));
					}
				}
			});
		});

		return this;
	};
}(jQuery));
