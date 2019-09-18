== HEAD

* Add to homescreen support for Chrome Mobile (#196)
* Update to Modernizr 2.7.0 (#195)
* Update Google Analytics snippet to Universal Analytics (#193)
* Update to Apache Server Configs 2.0.0
* Fixed `MBP.preventZoom` not limited to iOS devices and causing android problems (#190)
* Fixed `MBP.startupImage` causing width issues on iOS 7 (#189)
* Update to Normalize.css 2.1.3 (#188)
* Update to Apache Server Configs 1.1.0
* Add jQuery Source Maps (#184)
* Update to jQuery 2.0.3 (#185)
* Update to Normalize.css 2.1.2 (#181)
* Replace Zepto with jQuery 2.0.0 (#152)
* ghostClickHandler no longer listened for by default, so it plays nice with other 'tap' plugins (#168)
* Updated Zepto.js to v1.0
* Added new apple-touch-startup images (#149)
* Use 32x32 favicon.ico for HiDPI displays.
* Remove named function expression in plugins.js

== 4.1.0

* Update to Normalize.css 2.1.0.
* Reinstated `initial-scale=1` in meta viewport
* Added apple-touch-startup image support for iPhone 5 (#147, #151)
* Fixed `MBP.preventScrolling` breaking range input controls when using touch events (#148)
* Added meta tag for Win8 tile icon (#143)
* Further improvements to `console` method stubbing (#142).
* Update Modernizr to v2.6.2.
* Changed autogrow helper method to use `input` instead of `keyup` events, so it also triggers on paste.
* Add `apple-mobile-web-app-title` to iOS web app meta tags.
* Add CONTRIBUTING.md.

== 4.0.0

* Update to Normalize.css 2.0.1 (#127).
* Separate Normalize.css from the rest of the CSS.
* Replace jQuery with Zepto.js as default (#11).
* Update HiDPI example media query.
* Various bug fixes to `MBP.fastButton` (#126, #116).
* Add `MBP.startupImage` helper for apple web app startup images.
* Add `MBP.preventScrolling` helper to prevent default scrolling on document window.
* Update to Modernizr 2.6.1.
* Add bundled docs (#125).
* Add CHANGELOG.md (#129).
* Add MIT License.
* Code format and consistency changes.

== 3.0.0

* Remove `initial-scale=1.0` from meta.
* Exclude `scalefix` by default.
* Update startup tablet landscape dimensions.
* Added `lang` attr.
* Remove `meta` author.
* Add `MBP.enableActive`.
* Fix `MBP.hideUrlBar()` when addEventListener is undefined.
* Prevent iOS from zooming on focus.
* Work around a tricky bug in Android 2.3 to `MBP.fastButton`.
* Remove Respond.js.
* Split `hideUrlBar` into an intial function, and a general use function cached the scrollTop so that only needs to be detected once.
* Move `helper.js` one level up.
* Update jQuery to 1.7.1 and added missing fallback local file.
* Update Modernizr to the latest version.
* Add iPod (Touch) to `MBP.scaleFix`.
* Remove `input::-moz-focus-inner` as it is not required on Firefox on Mobile.
* Remove the ellipsis helper class.
* Remove the build script.
* Update 404 page to be consistent with HTML5 Boilerplate.
* Remove `demo/` and `test/`.
* Remove analytics and wspl.
