[Mobile Boilerplate homepage](http://mobileboilerplate.com/) | [Documentation
table of contents](README.md)

# The HTML

## Conditional comment for Window Phone 7

```html
<!--[if IEMobile 7 ]>    <html class="no-js iem7" manifest="default.appcache?v=1"...> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js"...> <!--<![endif]-->
```

Conditional comment to add class `iem7` for Window Phone 7


## The `no-js` class

Allows you to more easily explicitly add custom styles when JavaScript is
disabled (`no-js`) or enabled (`js`). More here: [Avoiding the
FOUC](http://paulirish.com/2009/avoiding-the-fouc-v3/).


## The order of meta tags, and `<title>`

As recommended by [the HTML5
spec](http://www.whatwg.org/specs/web-apps/current-work/complete/semantics.html#charset)
(4.2.5.5 Specifying the document's character encoding), add your charset
declaration early (before any ASCII art ;) to avoid a potential
[encoding-related security
issue](http://code.google.com/p/doctype-mirror/wiki/ArticleUtf7) in IE. It
should come in the first [1024
bytes](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#charset).

The charset should also come before the `<title>` tag, due to [potential XSS
vectors](http://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).

The meta tag for compatibility mode [needs to be before all elements except
title and meta](http://h5bp.com/f "Defining Document Compatibility - MSDN").
And that same meta tag can only be invoked for Google Chrome Frame if it is
within the [first 1024
bytes](http://code.google.com/p/chromium/issues/detail?id=23003).

## Mobile viewport

```html
<meta name="HandheldFriendly" content="True">
```

The `HandheldFriendly` meta-tag was used initially by older Palm and Blackberry models as well as browsers like AvantGo.

```html
<meta name="MobileOptimized" content="320"/>
```

Microsoft introduced the `MobileOptimized` tag for the PocketPC.

```html
<meta name="viewport" content="width=device-width">
```

This is more widely supported by modern smartphones, including but not limited to: iOS, Android, Palm Pre, Blackberry, Windows Phone 7.

There are a few different options that you can use with the [`viewport` meta
tag](https://docs.google.com/present/view?id=dkx3qtm_22dxsrgcf4 "Viewport and
Media Queries - The Complete Idiot's Guide"). You can find out more in [the
Apple developer docs](http://j.mp/mobileviewport). HTML5 Mobile Boilerplate comes with
a simple setup that strikes a good balance for general use cases.

## Home screen icon set

```html
 <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/touch/apple-touch-icon-144x144-precomposed.png">
```

For the third generation iPad with high-resolution Retina Display

```html
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/h/apple-touch-icon.png">
```

For the iPhone 4 with high-resolution Retina Display

```html
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/m/apple-touch-icon.png">
```

For the first-generation iPad

```html
<link rel="apple-touch-icon-precomposed" href="img/l/apple-touch-icon-precomposed.png">
```

For non-Retina iPhone, iPod Touch, and Android 2.1+ devices

```html
<link rel="shortcut icon" href="img/l/apple-touch-icon.png">
```

For a comprehensive overview, please read [Everything you always wanted to know about touch icons](http://mathiasbynens.be/notes/touch-icons) by Mathias Bynens.

For Nokia devices

## Mobile Internet Explorer ClearType Technology

```html
<meta http-equiv="cleartype" content="on">
```

Mobile Internet Explorer allows us to activate [ClearType](http://www.microsoft.com/typography/whatiscleartype.mspx) technology for smoothing fonts for easy reading

## iOS web app

```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

Makes the web page run in full screen mode when launched from the home screen icon; also hides the address bar and component bar at the top and bottom of the browser.

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

Styles the bar at the top of the browser

## More tags for your 'head'

```html
<!-- more tags for your 'head' to consider https://gist.github.com/849231 -->
```

Other tags that can be used in the head section

## Modernizr

HTML5 Mobile Boilerplate uses a custom build of Modernizr.

[Modernizr](http://modernizr.com) is a JavaScript library which adds classes to
the `html` element based on the results of feature test and which ensures that
all browsers can make use of HTML5 elements (as it includes the HTML5 Shiv).
This allows you to target parts of your CSS and JavaScript based on the
features supported by a browser.

In general, in order to keep page load times to a minimum, it's best to call
any JavaScript at the end of the page because if a script is slow to load
from an external server it may cause the whole page to hang. That said, the
Modernizr script *needs* to run *before* the browser begins rendering the page,
so that browsers lacking support for some of the new HTML5 elements are able to
handle them properly. Therefore the Modernizr script is the only JavaScript
file synchronously loaded at the top of the document.


## The content area

The central part of the boilerplate template is pretty much empty. This is
intentional, in order to make the boilerplate suitable for both web page and
web app development.

## jQuery

HTML5 Mobile Boilerplate comes with the latest version of [jQuery](http://jquery.com).

## Google Analytics Tracking Code

Finally, an optimized version of the latest Google Analytics tracking code is
included. Google recommends that this script be placed at the top of the page.
Factors to consider: if you place this script at the top of the page, you’ll be
able to count users who don’t fully load the page, and you’ll incur the max
number of simultaneous connections of the browser.

Further information:

* [Optimizing the asynchronous Google Analytics
  snippet](http://mathiasbynens.be/notes/async-analytics-snippet).
* [Tracking Site Activity - Google
  Analytics](http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html).
