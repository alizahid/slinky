/*
 * Slinky
 * Rather sweet menus
 * @author Ali Zahid <ali.zahid@live.com>
 * @license MIT
 */

class Slinky {
  // default options
  get options() {
    return {
      resize: true,
      speed: 300,
      theme: 'slinky-theme-default',
      title: false
    }
  }

  constructor(element, options = {}) {
    // save settings
    this.settings = {
      ...this.options,
      ...options
    }

    // let's go!
    this._init(element)
  }

  // setup the DOM just for us
  _init(element) {
    // the two elements of water and moisture
    this.menu = jQuery(element)
    this.base = this.menu.children().first()

    const { menu, settings } = this

    // set theme
    menu.addClass('slinky-menu').addClass(settings.theme)

    // set transition speed
    this._transition(settings.speed)

    // add arrows to links with children
    jQuery('a + ul', menu)
      .prev()
      .addClass('next')

    // wrap link text with <span>
    // mostly for styling
    jQuery('li > a', menu).wrapInner('<span>')

    // create header item
    const header = jQuery('<li>').addClass('header')

    // prepend it to the list
    jQuery('li > ul', menu).prepend(header)

    // create back buttons
    const back = jQuery('<a>')
      .prop('href', '#')
      .addClass('back')

    // prepend them to the headers
    jQuery('.header', menu).prepend(back)

    // do we need to add titles?
    if (settings.title) {
      // loop through each child list
      jQuery('li > ul', menu).each((index, element) => {
        // get the label from the parent link
        const label = jQuery(element)
          .parent()
          .find('a')
          .first()
          .text()

        // if it's not empty, create the title
        if (label) {
          const title = jQuery('<header>')
            .addClass('title')
            .text(label)

          // append it to the immediate header
          jQuery('> .header', element).append(title)
        }
      })
    }

    // add click listeners
    this._addListeners()

    // jump to initial active
    this._jumpToInitial()
  }

  // click listeners
  _addListeners() {
    const { menu, settings } = this

    jQuery('a', menu).on('click', e => {
      // prevent broken/half transitions
      if (this._clicked + settings.speed > Date.now()) {
        return false
      }

      // cache click time to check on next click
      this._clicked = Date.now()

      // get the link
      const link = jQuery(e.currentTarget)

      // prevent default if it's a hash
      // or a Slinky button
      if (
        link.attr('href').indexOf('#') === 0 ||
        link.hasClass('next') ||
        link.hasClass('back')
      ) {
        e.preventDefault()
      }

      // time to move
      if (link.hasClass('next')) {
        // one step forward

        // remove the current active
        menu.find('.active').removeClass('active')

        // set the new active
        link
          .next()
          .show()
          .addClass('active')

        // make the chess move
        this._move(1)

        // resize the menu if need be
        if (settings.resize) {
          this._resize(link.next())
        }
      } else if (link.hasClass('back')) {
        // and two steps back
        // just one step back, actually

        // make the move
        this._move(-1, () => {
          // remove the current active
          menu.find('.active').removeClass('active')

          // set the new active
          link
            .parent()
            .parent()
            .hide()
            .parentsUntil(menu, 'ul')
            .first()
            .addClass('active')
        })

        // resize the menu if need be
        if (settings.resize) {
          this._resize(
            link
              .parent()
              .parent()
              .parentsUntil(menu, 'ul')
          )
        }
      }
    })
  }

  // jump to initial active on init
  _jumpToInitial() {
    const { menu, settings } = this

    // get initial active
    const active = menu.find('.active')

    if (active.length > 0) {
      // remove initial active
      active.removeClass('active')

      // jump without animation
      this.jump(active, false)
    }

    // set initial height on the menu
    // to fix the first transition resize bug
    setTimeout(() => menu.height(menu.outerHeight()), settings.speed)
  }

  // slide the menu
  _move(depth = 0, callback = () => {}) {
    // don't bother packing if we're not going anywhere
    if (depth === 0) {
      return
    }

    const { settings, base } = this

    // get current position from the left
    const left = Math.round(parseInt(base.get(0).style.left)) || 0

    // set the new position from the left
    base.css('left', `${left - depth * 100}%`)

    // callback after the animation
    if (typeof callback === 'function') {
      setTimeout(callback, settings.speed)
    }
  }

  // resize the menu
  // to match content height
  _resize(content) {
    const { menu } = this

    menu.height(content.outerHeight())
  }

  // set the transition speed
  _transition(speed = 300) {
    const { menu, base } = this

    menu.css('transition-duration', `${speed}ms`)
    base.css('transition-duration', `${speed}ms`)
  }

  // jump to an element
  jump(target, animate = true) {
    if (!target) {
      return
    }

    const { menu, settings } = this

    const to = jQuery(target)

    // get all current active
    const active = menu.find('.active')

    // how many moves must we jump?
    let count = 0

    // this many
    // until we reach the parent list
    if (active.length > 0) {
      count = active.parentsUntil(menu, 'ul').length
    }

    // remove current active
    // hide all lists
    menu
      .find('ul')
      .removeClass('active')
      .hide()

    // get parent list
    const menus = to.parentsUntil(menu, 'ul')

    // show parent list
    menus.show()

    // show target
    to.show().addClass('active')

    // set transition speed to 0 if no animation
    if (!animate) {
      this._transition(0)
    }

    // make the checkers move
    this._move(menus.length - count)

    // resize menu if need be
    if (settings.resize) {
      this._resize(to)
    }

    // set transition speed to default after transition
    if (!animate) {
      this._transition(settings.speed)
    }
  }

  // go big or go home
  // just go home
  home(animate = true) {
    const { base, menu, settings } = this

    // set transition speed to 0 if no animation
    if (!animate) {
      this._transition(0)
    }

    // get current active
    const active = menu.find('.active')

    // get all parent lists
    const parents = active.parentsUntil(menu, 'ul')

    // make the move
    this._move(-parents.length, () => {
      // remove the current active
      active.removeClass('active').hide()

      // hide all parents except base
      parents.not(base).hide()
    })

    // resize if need be
    if (settings.resize) {
      this._resize(base)
    }

    // set transition speed back to default
    if (animate === false) {
      this._transition(settings.speed)
    }
  }

  // crush, kill, destroy
  destroy() {
    const { base, menu } = this

    // remove all headers
    jQuery('.header', menu).remove()

    // remove Slinky links
    // and click listeners
    jQuery('a', menu)
      .removeClass('next')
      .off('click')

    // remove inline styles
    menu.css({
      height: '',
      'transition-duration': ''
    })

    base.css({
      left: '',
      'transition-duration': ''
    })

    // remove Slinky HTML
    jQuery('li > a > span', menu)
      .contents()
      .unwrap()

    // remove any current active
    menu.find('.active').removeClass('active')

    // remove any Slinky style classes
    const styles = menu.attr('class').split(' ')

    styles.forEach(style => {
      if (style.indexOf('slinky') === 0) {
        menu.removeClass(style)
      }
    })

    // reset fields
    const fields = ['settings', 'menu', 'base']

    fields.forEach(field => delete this[field])
  }
}

// jQuery plugin
;($ => {
  $.fn.slinky = function(options) {
    const menu = new Slinky(this, options)

    return menu
  }
})(jQuery)
