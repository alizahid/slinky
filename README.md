# Slinky

jQuery sliding menu

A light-weight, responsive, mobile-like navigation menu plugin

### [Demo](http://alizahid.github.io/slinky)

## Installation

Download the [latest version](https://github.com/alizahid/slinky/archive/gh-pages.zip). The files you need are;

- [dist/jquery.slinky.js](dist/jquery.slinky.js)
- [dist/jquery.slinky.css](dist/jquery.slinky.css)

### Bower

	bower install jquery-slinky

Include these files;

	<script src="bower_components/slinky/dist/jquery.slinky.js"></script>

	<link rel="stylesheet" src="bower_components/slinky/dist/jquery.slinky.css">

### NPM

	npm install jquery-slinky

Include these files;

	<script src="node_modules/slinky/dist/jquery.slinky.js"></script>

	<link rel="stylesheet" src="node_modules/slinky/dist/jquery.slinky.css">

## Usage

    var slinky = $('.menu').slinky(options);

## Options

Option | Default value | Description
------ | ------------- | -----------
`label` | 'Back' | Label for the back button. Pass `true` to use the link's own label
`title` | `false` | Pass `true` to show title of current menu level
`speed` | `300` | Animation speed in `milliseconds`
`resize` | `true` | Resize menu height to match content on navigation

## API

### .home()

Navigate back to the main menu

Option | Default value | Description
------ | ------------- | -----------
`animate` | `true` | Pass `false` to skip animation

### .jump()

Navigate to a sub menu

Option | Default value | Description
------ | ------------- | -----------
`to` |  | Pass a selector for the `ul` element to jump to
`animate` | `true` | Pass `false` to skip animation

### .destroy()

Remove slinky

## Tips

- Set `.active` on a `ul` element to jump there on init
