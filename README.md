# Zoomify

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
```javascript
$('img.my-image-1').zoomify(); // Default settings
$('img.my-image-2').zoomify({ duration: 1000 }); // 1s duration
```

## Options
Property | Type | Default | Description
---|---|---|---
duration | `integer` | `200` | Transition duration in milliseconds.
easing | `string` | `"linear"` | Transition property name.
scale | `float` | `0.9` | Maximum zoom scale (1 means full screen).

## Events
Event | Description
---|---
zoom-in.zoomify | Fired before each zoom-in transformation.
zoom-in-complete.zoomify | Fired after each zoom-in transformation.
zoom-out.zoomify | Fired before each zoom-out transformation.
zoom-out-complete.zoomify | Fired after each zoom-out transformation.

## License
Copyright (c) 2015 Indri Muska. Licensed under the MIT license.