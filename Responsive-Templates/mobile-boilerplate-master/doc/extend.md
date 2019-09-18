[Mobile Boilerplate homepage](http://mobileboilerplate.com/) | [Documentation
table of contents](README.md)

# Extend and customise Mobile Boilerplate

Here is some useful advice for how you can make your project with Mobile Boilerplate even better. We don't want to include it all by default, as not everything fits with everyone's needs.

## Web Server Configuration

### Transcoding Prevention

Many mobile network operators implemented "content transcoders" or "transcoding proxies" (Vodafone and TeliaSonera are among them). These content transcoders make the desktop web available on mobile devices. One of the side effects is that, already mobile optimized portals are also reformatted, destroying a carefully designed mobile user experience.

The line of code below in the .htaccess file could prevent content transcoders from altering your mobile web content.

`Cache-Control: no-transform`

Read more at the articles below:
[http://mobiforge.com/developing/blog/responsible-reformatting](http://mobiforge.com/developing/blog/responsible-reformatting)
[http://mobiforge.com/developing/story/setting-http-headers-advise-transcoding-proxies](http://mobiforge.com/developing/story/setting-http-headers-advise-transcoding-proxies)

### Server side redirection script

Server side mobile redirection script is added at the bottom of the page to detect if user is viewing from mobile device. This is taken from [detect mobile browser](http://detectmobilebrowser.com/). If the script detects the user is viewing from mobile phone, they will be redirected to the mobile version of the site.

Usage Instruction:
1. This is by default commented out, so to use it, you have to uncomment the lines below.
2. change the last line http://www.example.com/mobile to the URL of your mobile site.

```apache
#RewriteEngine On
#RewriteBase /
#RewriteCond %{HTTP_USER_AGENT} android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge\ |maemo|midp|mmp|opera\ m(ob|in)i|palm(\ os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows\ (ce|phone)|xda|xiino [NC,OR]
#RewriteCond %{HTTP_USER_AGENT} ^(1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a\ wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r\ |s\ )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1\ u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(\ i|ip)|hs\-c|ht(c(\-|\ |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(\ |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(\ |\/)|klon|kpt\ |kwc\-|kyo(c|k)|le(no|xi)|lg(\ g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-|\ |o|v)|zz)|mt(50|p1|v\ )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v\ )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|\ )|webc|whit|wi(g\ |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-) [NC]
# RewriteRule ^$ http://www.example.com/mobile [R,L]
```

One thing to note is that if you want to allow the user on the mobile version of your site to have the option to switch to desktop version, you may consider using another method like JavaScript or PHP. There is a list of other language support you can consider using:
ASP, ASP.NET, ColdFusion, C#, IIS, JSP, JavaScript, jQuery, nginx, node.js, PHP, Perl, Python, Rails.

### Mobile MIME Types

There are device specific MIME types made by various mobile vendors. Files with these extensions may not get rendered with the right MIME type by the server.

Here is a list of file extensions that are not supported by default.

```apache
# Blackberry types

AddType application/x-bb-appworld      bbaw
AddType text/vnd.rim.location.xloc     xloc

# Nokia types

AddType application/octet-stream            sisx
AddType application/vnd.symbian.install     sis
AddType application/java-archive            jar
AddType application/x-java-archive          jar
AddType text/vnd.sun.j2me.app-descriptor    jad
```

* [Apache configuration for mobile application download](http://bit.ly/SJJCND)
* [How to enable OTA (Over The Air) SIS install from your website](http://bit.ly/ORTLLA)

## DNS prefetching

In short, DNS Prefetching is a method of informing the browser of domain names
referenced on a site so that the client can resolve the DNS for those hosts,
cache them, and when it comes time to use them, have a faster turn around on
the request.

### Implicit prefetches

There is a lot of prefetching done for you automatically by the browser. When
the browser encounters an anchor in your html that does not share the same
domain name as the current location the browser requests, from the client OS,
the IP address for this new domain. The client first checks its cache and
then, lacking a cached copy, makes a request from a DNS server. These requests
happen in the background and are not meant to block the rendering of the
page.

The goal of this is that when the foreign IP address is finally needed it will
already be in the client cache and will not block the loading of the foreign
content. Less requests result in faster page load times. The perception of this
is increased on a mobile platform where DNS latency can be greater.

#### Disable implicit prefetching

```html
<meta http-equiv="x-dns-prefetch-control" content="off">
```

Even with X-DNS-Prefetch-Control meta tag (or http header) browsers will still
prefetch any explicit dns-prefetch links.

**_WARNING:_** THIS MAY MAKE YOUR SITE SLOWER IF YOU RELY ON RESOURCES FROM
FOREIGN DOMAINS.

### Explicit prefetches

Typically the browser only scans the HTML for foreign domains. If you have
resources that are outside of your HTML (a javascript request to a remote
server or a CDN that hosts content that may not be present on every page of
your site, for example) then you can queue up a domain name to be prefetched.

```html
<link rel="dns-prefetch" href="//example.com">
<link rel="dns-prefetch" href="//ajax.googleapis.com">
```

You can use as many of these as you need, but it's best if they are all
immediately after the [Meta
Charset](https://developer.mozilla.org/en/HTML/Element/meta#attr-charset)
element (which should go right at the top of the `head`), so the browser can
act on them ASAP.

#### Common Prefetch Links

Amazon S3:

```html
<link rel="dns-prefetch" href="//s3.amazonaws.com">
```

Google APIs:

```html
<link rel="dns-prefetch" href="//ajax.googleapis.com">
```

Microsoft Ajax Content Delivery Network:

```html
<link rel="dns-prefetch" href="//ajax.microsoft.com">
<link rel="dns-prefetch" href="//ajax.aspnetcdn.com">
```

### Browser support for DNS prefetching

Chrome, Firefox 3.5+, Safari 5+, Opera (Unknown), IE 9 (called "Pre-resolution"
on blogs.msdn.com)

### Further reading about DNS prefetching

* https://developer.mozilla.org/En/Controlling_DNS_prefetching
* http://dev.chromium.org/developers/design-documents/dns-prefetching
* http://www.apple.com/safari/whats-new.html
* http://blogs.msdn.com/b/ie/archive/2011/03/17/internet-explorer-9-network-performance-improvements.aspx
* http://dayofjs.com/videos/22158462/web-browsers_alex-russel


## Search

### Direct search spiders to your sitemap

[Learn how to make a sitemap](http://www.sitemaps.org/protocol.php)

```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
```

### Hide pages from search engines

According to Heather Champ, former community manager at Flickr, you should not
allow search engines to index your "Contact Us" or "Complaints" page if you
value your sanity. This is an HTML-centric way of achieving that.

```html
<meta name="robots" content="noindex">
```

**_WARNING:_** DO NOT INCLUDE ON PAGES THAT SHOULD APPEAR IN SEARCH ENGINES.

## URLs

### Canonical URL

Signal to search engines and others "Use this URL for this page!" Useful when
parameters after a `#` or `?` is used to control the display state of a page.
`http://www.example.com/cart.html?shopping-cart-open=true` can be indexed as
the cleaner, more accurate `http://www.example.com/cart.html`.

```html
<link rel="canonical" href="">
```

### Official shortlink

Signal to the world "This is the shortened URL to use this page!" Poorly
supported at this time. Learn more by reading the [article about shortlinks on
the Microformats wiki](http://microformats.org/wiki/rel-shortlink).

```html
<link rel="shortlink" href="h5bp.com">
```

## App Stores

### Install a Chrome Web Store app

Users can install a Chrome app directly from your website, as long as the app
and site have been associated via Google's Webmaster Tools. Read more on
[Chrome Web Store's Inline Installation
docs](https://developers.google.com/chrome/web-store/docs/inline_installation).

```html
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/APP_ID">
```

### Smart App Banners in iOS 6 Safari

Stop bothering everyone with gross modals advertising your entry in the App Store.
This bit of code will unintrusively allow the user the option to download your iOS
app, or open it with some data about the user's current state on the website.

```html
<meta name="apple-itunes-app" content="app-id=APP_ID,app-argument=SOME_TEXT">
```

## Google Analytics augments

### Google Analytics For Mobile

Low-end mobile devices may not support JavaScript, same as email tracking, to tackle this issue, Google use image download as a tracker.

All the same data that you've come to expect from your Google Analytics reports is now available for mobile websites. Simply paste their server-side code snippets (available for PHP, JSP, ASP.NET, and Perl) on each page you wish to track. Google Analytics then creates a profile for your mobile website where you can view the same kind of information that's in standard Analytics reports including visitor information and traffic sources. You'll be able to track users visiting your mobile website from both high-end "smartphones" and WAP devices. For more information on tracking hits to mobile sites, see the [server-side developer's guide](http://code.google.com/mobile/analytics/docs/web/).

### More tracking settings

The [optimized Google Analytics
snippet](http://mathiasbynens.be/notes/async-analytics-snippet) included with
Mobile Boilerplate includes something like this:

```js
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];
```

In case you need more settings, just extend the array literal instead of
[`.push()`ing to the
array](http://mathiasbynens.be/notes/async-analytics-snippet#dont-push-it)
afterwards:

```js
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview'], ['_setAllowAnchor', true]];
```

### Anonymize IP addresses

In some countries, no personal data may be transferred outside jurisdictions
that do not have similarly strict laws (i.e. from Germany to outside the EU).
Thus a webmaster using the Google Analytics script may have to ensure that no
personal (trackable) data is transferred to the US. You can do that with [the
`_gat.anonymizeIp`
option](http://code.google.com/apis/analytics/docs/gaJS/gaJSApi_gat.html#_gat._anonymizeIp).
In use it looks like this:

```js
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_gat._anonymizeIp'], ['_trackPageview']];
```

### Track jQuery AJAX requests in Google Analytics

An article by @JangoSteve explains how to [track jQuery AJAX requests in Google
Analytics](http://www.alfajango.com/blog/track-jquery-ajax-requests-in-google-analytics/).

Add this to `plugins.js`:

```js
/*
 * Log all jQuery AJAX requests to Google Analytics
 * See: http://www.alfajango.com/blog/track-jquery-ajax-requests-in-google-analytics/
 */
if (typeof _gaq !== "undefined" && _gaq !== null) {
    $(document).ajaxSend(function(event, xhr, settings){
        _gaq.push(['_trackPageview', settings.url]);
    });
}
```

### Track JavaScript errors in Google Analytics

Add this function after `_gaq` is defined:

```js
(function(window){
    var undefined,
        link = function (href) {
            var a = window.document.createElement('a');
            a.href = href;
            return a;
        };
    window.onerror = function (message, file, row) {
        var host = link(file).hostname;
        _gaq.push([
            '_trackEvent',
            (host == window.location.hostname || host == undefined || host == '' ? '' : 'external ') + 'error',
            message, file + ' LINE: ' + row, undefined, undefined, true
        ]);
    };
}(window));
```

### Track page scroll

Add this function after `_gaq` is defined:

```js
$(function(){
    var isDuplicateScrollEvent,
        scrollTimeStart = new Date,
        $window = $(window),
        $document = $(document),
        scrollPercent;

    $window.scroll(function() {
        scrollPercent = Math.round(100 * ($window.height() + $window.scrollTop())/$document.height());
        if (scrollPercent > 90 && !isDuplicateScrollEvent) { //page scrolled to 90%
            isDuplicateScrollEvent = 1;
            _gaq.push(['_trackEvent', 'scroll',
                'Window: ' + $window.height() + 'px; Document: ' + $document.height() + 'px; Time: ' + Math.round((new Date - scrollTimeStart )/1000,1) + 's',
                undefined, undefined, true
            ]);
        }
    });
});
```


## Miscellaneous

* Use [HTML5
  polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills).

* If you're building a web app you may want [native style momentum scrolling in
  iOS5](http://johanbrook.com/browsers/native-momentum-scrolling-ios-5/) using
  `-webkit-overflow-scrolling: touch`.

* Automatic telephone number detection prevention for iOS and Android using
  `<meta name="format-detection" content="telephone=no">`. 
  [Safari HTML Reference Supported Meta Tags](http://developer.apple.com/library/safari/#documentation/appleapplications/reference/SafariHTMLRef/Articles/MetaTags.html)

* Avoid development/stage websites "leaking" into SERPs (search engine results
  page) by [implementing X-Robots-tag
  headers](https://github.com/h5bp/html5-boilerplate/issues/804).

* Screen readers currently have less-than-stellar support for HTML5 but the JS
  script [accessifyhtml5.js](https://github.com/yatil/accessifyhtml5.js) can
  help increase accessibility by adding ARIA roles to HTML5 elements.


*Many thanks to [Brian Blakely](https://github.com/brianblakely) for
contributing much of this information.*
