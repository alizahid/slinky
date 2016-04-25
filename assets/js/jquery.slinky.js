/*

	Slinky
	A light-weight, responsive, mobile-like navigation menu plugin for jQuery
	Built by Ali Zahid
	Published under the MIT license

*/

;(function($) {
	$.fn.slinky = function(options) {
		// Setup plugin defaults

		var settings = $.extend({
			label: 'Back',
			title: false,
			speed: 300,
			resize: true
		}, options);

		// Convenience method for navigation animation

		var move = function(menu, next, callback) {
			var left = Math.round(parseInt(menu.get(0).style.left)) || 0;

			// Use multiples of 100% for responsive animation

			menu.css('left', -Math.abs(next ? left - 100 : left + 100) + '%');

			// Callback after animation is finished

			if (typeof callback === 'function') {
				setTimeout(callback, settings.speed);
			}
		};

		// Convenience method for resizing menu

		var resize = function(menu, content) {
			menu.height(content.outerHeight());
		};

		return this.each(function() {
			// The root node is where animation happens

			var menu = $(this),
				root = menu.children().first();

			// Set CSS animation duration

			menu.css('transition-duration', settings.speed + 'ms');
			root.css('transition-duration', settings.speed + 'ms');

			// Add .next class to links with sub menus

			$('a + ul', menu).prev().addClass('next');

			// Add header for back button and title

			$('li > ul', menu).prepend('<li class="header">');

			// Add title

			if (settings.title === true) {
				// Create a label with title from the parent

				$('li > ul', menu).each(function() {
					var label = $(this).parent().find('a').first().text(),
						title = $('<h2>').text(label);

					$('> .header', this).append(title);
				});
			}

			// Add back links with appropriate labels

			if (!settings.title && settings.label === true) {
				// Create a link with label from parent

				$('li > ul', menu).each(function() {
					var label = $(this).parent().find('a').first().text(),
						backLink = $('<a>').text(label).prop('href', '#').addClass('back');

					$('> .header', this).append(backLink);
				});
			} else {
				// Create a link with the label from settings

				var backLink = $('<a>').text(settings.label).prop('href', '#').addClass('back');

				$('.header', menu).append(backLink);
			}

			// Setup navigation

			$('a', menu).on('click', function(e) {
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
