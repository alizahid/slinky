/*

Slinky
A light-weight, responsive, mobile-like menu plugin for jQuery
Made by Ali Zahid
Published under the MIT license

*/

;(function ($) {
	$.fn.slinky = function (options) {
		// Setup plugin defaults

		var settings = $.extend({
			label: 'Back',
			speed: 300,
			resize: true
		}, options);

		// Convenience method for navigation animation

		var move = function (menu, next, callback) {
			var width = menu.outerWidth(),
				left = Math.round(parseInt(menu[0].style.left)) || 0;

			// Use multiples of 100% for responsive animation

			menu.stop(true, true).animate({
				left: -Math.abs(next ? left - 100 : left + 100) + '%'
			}, settings.speed, function () {
				// Callback after animation is finished

				if (typeof callback === 'function') {
					callback();
				}
			});
		};

		// Convenience method for resizing menu

		var resize = function (menu, content) {
			menu.stop(true, true).animate({
				height: content.outerHeight()
			}, settings.speed);
		};

		return this.each(function () {
			// The root node is where animation happens

			var menu = $(this),
				root = menu.children().first();

			// Add .next class to links with sub menus

			$('a + ul', menu).prev().addClass('next');

			// Add back links with correct labels

			if (settings.label === true) {
				// Create a link with label from parent

				$('li > ul', menu).each(function () {
					var label = $(this).parent().find('a').first().text(),
						backLink = $('<a>').text(label).prop('href', '#').addClass('back');

					$(this).prepend(backLink);
				});
			} else {
				// Create a link with the label from settings

				var backLink = $('<a>').text(settings.label).prop('href', '#').addClass('back');

				$('li > ul', menu).prepend(backLink);
			}

			// Setup navigation

			$('a', menu).on('click', function (e) {
				var a = $(this);

				// Disable navigation if link has hash
				// else proceed to URL

				if (/#/.test(this.href)) {
					e.preventDefault();
				}

				// Animate forward or backward
				// Resize menu height to match content, if required

				if (a.hasClass('next')) {
					a.next().show();

					move(root, true);

					if (settings.resize) {
						resize(menu, a.next());
					}
				} else if (a.hasClass('back')) {
					move(root, false, function () {
						a.parent().hide();
					});

					if (settings.resize) {
						resize(menu, a.parent().parents('ul'));
					}
				}
			});
		});

		return this;
	};
}(jQuery));
