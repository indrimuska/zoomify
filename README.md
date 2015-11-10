# Zoomify

[![Join the chat at https://gitter.im/indrimuska/zoomify](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/indrimuska/zoomify?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Zoomify is a jQuery plugin for simple lightboxes with zoom effect.

Check out the examples page: [http://indrimuska.github.io/zoomify](http://indrimuska.github.io/zoomify).

![Zoomify: jQuery Plugin for lightboxes](http://indrimuska.github.io/zoomify/img/zoomify-preview.png)

## Installation

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="js/vendor/zoomify/dist/zoomify.min.js"></script>
<link href="css/vendor/zoomify/dist/zoomify.min.css" rel="stylesheet">
```

## Usage

Enable zoomify via JavaScript:

```javascript
$('img.myImage1').zoomify(); // Default settings
$('img.myImage2').zoomify({ duration: 1000 }); // 1s duration
```

## Options

Property | Type | Default | Description
---|---|---|---
duration | `integer` | `200` | Transition duration in milliseconds.
easing | `string` | `"linear"` | Transition property name.
scale | `float` | `0.9` | If the image is bigger than the size of the page, it represent the maximum zoom scale according to page width/height (from 0 to 1).

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-duration=""`.

## Methods

Method | Description
---|---
zoom | Starts a zoom-in or a zoom-out transformation depending on the state of the image.
zoomIn | Starts a zoom-in transformation.
zoomOut | Starts a zoom-out transformation.
reposition | Calculates the correct position of the image and moves it at the center of the visible part of page.

Example of call the `zoomIn()` method:
```javascript
$('#myImage').zoomify('zoomIn');
```

## Events

Event | Description
---|---
zoom-in.zoomify | Fired before each zoom-in transformation.
zoom-in-complete.zoomify | Fired after each zoom-in transformation.
zoom-out.zoomify | Fired before each zoom-out transformation.
zoom-out-complete.zoomify | Fired after each zoom-out transformation.

```javascript
$('#myImage').on('zoom-in.zoomify', function () {
    // do something...
});
```

## License

Copyright (c) 2015 Indri Muska. Licensed under the MIT license.