
	/*
	 *
	 *	jQuery Sliding Menu Plugin
	 *	Mobile app list-style navigation in the browser
	 *
	 *	Written by Ali Zahid
	 *	http://designplox.com/jquery-sliding-menu
	 *
	 */

(function($)
{
	var usedIds = [];

	$.fn.menu = function(data)
	{
		var selector = this.selector;

		return this.each(function()
		{
			var self = this,
				menu = $(self);

			if (menu.hasClass('sliding-menu'))
			{
				return;
			}

			var menuWidth = menu.width();

			data = process(data);

			menu.addClass('sliding-menu');

			var rootPanel;

			$(data).each(function(index, item)
			{
				var panel = $('<ul></ul>');

				if (item.root)
				{
					rootPanel = '#' + item.id;
				}

				panel.attr('id', item.id);
				panel.width(menuWidth);

				$(item.children).each(function(index, item)
				{
					var link = $('<a></a>');

					link.attr('class', item.styleClass);
					link.attr('href', item.href);
					link.text(item.label);

					var li = $('<li></li>');

					li.append(link);

					panel.append(li);

				});

				menu.append(panel);

			});

			rootPanel = $(rootPanel);
			rootPanel.addClass('menu-panel-root');

			var currentPanel = rootPanel;

			menu.height(rootPanel.height());

			var wrapper = $('<div></div>').addClass('sliding-menu-wrapper').width(data.length * menuWidth);

			menu.wrapInner(wrapper);

			wrapper = $('.sliding-menu-wrapper', menu);

			$('a', self).on('click', function(e)
			{
				var href = $(this).attr('href'),
					label = $(this).text();

				if (href == '#')
				{
					e.preventDefault();
				}
				else if (href[0] == '#')
				{
					var target = $(href);

					var isBack = $(this).hasClass('back');

					var marginLeft = parseInt(wrapper.css('margin-left'));

					if (isBack)
					{
						wrapper.animate(
						{
							marginLeft: marginLeft + menuWidth

						}, 'fast');
					}
					else
					{
						target.insertAfter(currentPanel);

						$('.back', target).text(label);

						wrapper.animate(
						{
							marginLeft: marginLeft - menuWidth

						}, 'fast');
					}

					currentPanel = target;

					menu.animate(
					{
						height: target.height()

					}, 'fast');

					e.preventDefault();
				}

			});

			return this;

		});

		function process(data, parent)
		{
			var root = { id: 'menu-panel-' + getNewId(), children: [], root: (parent ? false : true) },
				panels = [];

			if (parent)
			{
				root.children.push(
				{
					label: 'Back',
					styleClass: 'back',
					href: '#' + parent.id

				});
			}

			$(data).each(function(index, item)
			{
				root.children.push(item);

				if (item.children)
				{
					var panel = process(item.children, root);

					item.href = '#' + panel[0].id;
					item.styleClass = 'nav';

					panels = panels.concat(panel);
				}

			});

			return [root].concat(panels);
		}

		function getNewId()
		{
			var id;

			do
			{
				id = Math.random().toString(36).substring(3, 8);
			}
			while (usedIds.indexOf(id) >= 0);

			usedIds.push(id);

			return id;
		}

	};

} (jQuery));
