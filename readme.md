![](./slinky.png)

# Slinky

Rather sweet menus

A light-weight, responsive, mobile-like navigation menu plugin

### [Demo](https://alizahid.github.io/slinky/)

## Installation

Download the [latest version](https://github.com/alizahid/slinky/releases). The files you need are

- [dist/slinky.min.js](dist/slinky.min.js)
- [dist/slinky.min.css](dist/slinky.min.css)

### Bower

```
bower install jquery-slinky
```

Include these files

```html
<link rel="stylesheet" src="bower_components/slinky/dist/slinky.min.css" />
<script src="bower_components/slinky/dist/slinky.min.js"></script>
```

### NPM

```
npm install jquery-slinky
```

Include these files

```html
<link rel="stylesheet" src="node_modules/slinky/dist/slinky.min.css" />
<script src="node_modules/slinky/dist/slinky.min.js"></script>
```

## Usage

```javascript
const slinky = $('.menu').slinky(options)
```

## Options

| Option   | Default                | Description                                       |
| -------- | ---------------------- | ------------------------------------------------- |
| `resize` | `true`                 | Resize menu height to match content on navigation |
| `speed`  | `300`                  | Animation speed in `milliseconds`                 |
| `theme`  | `slinky-theme-default` | Slinky theme                                      |
| `title`  | `false`                | Show title of sub menu                            |

## API

### `.home(animate)`

Navigate back to the root menu

| Option    | Default value | Description                    |
| --------- | ------------- | ------------------------------ |
| `animate` | `true`        | Pass `false` to skip animation |

### `.jump(target, animate)`

Navigate to a sub menu

| Option    | Default value | Description                         |
| --------- | ------------- | ----------------------------------- |
| `to`      |               | Selector for `ul` target to jump to |
| `animate` | `true`        | Pass `false` to skip animation      |

### `.destroy()`

Remove Slinky

## Tips

- Set `.active` on a `ul` element to jump there on init
