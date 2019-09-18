[HTML5 Mobile Boilerplate homepage](http://html5boilerplate.com/mobile) | [Documentation
table of contents](README.md)

# The JavaScript

Information about the default JavaScript included in the project.

## helper.js

A JavaScript helper file is included in the boilerplate with namespace MBP. It contains a selection of kick-ass functions that help you to improve mobile user experience.

### iPhone Scale Bug Fix

`MBP.scaleFix` is used to fix the iPhone reflow scale bug, read more about it here: a fix for iphone viewport scale bug

Usage: 

```
MBP.scaleFix();
```

### Hide URL Bar

`MBP.hideUrlBarOnLoad` is used to hide the URL bar at the top of mobile Safari on your iOS. Mobile space is limited and this helps to leverage every pixel on the screen to maximize display area.

Usage:

``` 
MBP.hideUrlBarOnLoad();
```

### Fast Buttons (only use this if you only target webkit browsers, we are still testing out cross-browser support)

`MBP.fastButton` is used to make instant responsive buttons, 300ms faster to be exact. (It uses `touchstart` to detect click event.) 

Usage:

```
new MBP.fastButton(document.getElementById('myBtn'), function() {alert("clicked")});
```

### Autogrow textarea

`MBP.autogrow` is used to make textarea to grow its height while you are entering more lines of text.

Usage:

``` 
new MBP.autogrow(document.getElementById('myTextarea'), 14); // 14 -- line height
```

### Enable CSS active pseudo styles

A hack to enable CSS active pseudo styles in iOS Safari and various other webkit based mobile browsers.

Usage:

```
MBP.enableActive();
```

### Prevent default scrolling on document window

Prevent default scrolling on the main document window.

Usage:

```
MBP.preventScrolling();
```

### Prevent iOS from zooming onfocus

Prevent iOS Safari from zooming the viewport when form inputs receive focus.

Usage:

```
 MBP.preventZoom();
```

### iOS Startup Image helper

`MBP.startupImage` is used to insert iOS startup image meta tags into the document head. The method will insert the correct type of startup image(s) required by a particular iOS device, including iPhone and iPad in both Retina and non-Retina resolutions.

Usage:

```
MBP.startupImage();
```

## main.js

This file can be used to contain or reference your site/app JavaScript code.
For larger projects, you can make use of a JavaScript module loader, like
[Require.js](http://requirejs.org/), to load any other scripts you need to
run.

## plugins.js

This file can be used to contain all your plugins, such as jQuery plugins and other 3rd party scripts.

One approach is to put jQuery plugins inside of a `(function($){ ... })(window.jQuery);` closure to make sure they're in the jQuery namespace safety blanket.

## vendor

This directory can be used to contain all 3rd party library code.

Minified versions of the latest jQuery and Modernizr libraries are included by
default. You may wish to create your own [custom Modernizr
build](http://www.modernizr.com/download/).
