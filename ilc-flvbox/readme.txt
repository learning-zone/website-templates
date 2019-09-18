=== ILC FLVBox ===
Contributors: ilovecolors
Donate link: http://ilovecolors.com.ar
Tags: video, flv, thickbox, modal dialog, admin
Requires at least: 2.6
Tested up to: 2.7
Stable tag: trunk

Plays FLV video inline in content or in a modal dialog.


== Description ==

ILC FLVBox will parse your post content looking for links to FLV videos. When found, it will add a player to play it inline or in a modal dialog.

The modal dialog is currently handled by ThickBox, which requires jQuery. Both Thickbox and jQuery are loaded from the versions included with WordPress using wp&#95;enqueue&#95;script.

http://jquery.com/demo/thickbox/
http://jquery.com/


The FLV players included are:

http://miplayweb.com/player/
<br/>
http://osflv.com/


The player embedding uses SWFObject 1.5 (sometimes IE6 doesn't get along nice with SWFObject 2.1 dynamic publishing, as soon as this is sorted out the SWFObject included will be upgraded).

http://blog.deconcept.com/2007/02/28/swfobject-1-5-released/
http://code.google.com/p/swfobject/ (current 2.1 version)

This software is provided without warranty of any kind.

There's an option page with an option to select an FLV Player. You can choose here your player, MiPlayWeb or OSFLV. If you select OSFLV more options are unfolded (background and foreground colors, initial volume level). Flowplayer player will be added later to the list of optional players.

When you check the box enabling ThickBox, a textarea is unfolded containing an CSS file that will allow you to set the style of the inline image. You can also edit this file independently on your editor of choice, by opening the flvbox.css file. If Thickbox is in use, the player is set to autoplay, so when you click on the image launching the player, the video will start inmediately.

The FLVBox dimensions option sets the size of the player (indirectly, the video, but not specifically). The ThickBox area is adjusted accordingly.

There's one last field in case you need to rename the folder or change the path of ILC_FLVBox.
Both Thickbox and jQuery are loaded from the versions included with WordPress using wp&#95;enqueue&#95;script.

== Installation ==

1. Upload `ilc-flvbox` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. You can access the options page via the Admin navigation or in the plugins list, using the Settings link.
4. Edit a post/page, upload a video using the Add Video button and insert the link to the file into the post.
5. If you wish to include a preview of the video upload a jpg image with the same name than the video. For example, if your video is "piano.flv" the jpg would be "piano.jpg".


== Frequently Asked Questions ==

= I have changed ThickBox's css and nothing happens =
Make sure you don't have other ThickBox loading. The wp_enqueue_script is the safe method for including script files into WordPress but some plugin developers are not using it. Ask who develops your plugin to modify it by using wp&#95;enqueue&#95;script and wp&#95;enqueue&#95;style.

= Which is the version of jQuery that this plugin uses? =
The plugin enqueues the jQuery version included in WordPress. As of version 2.7 WP includes jQuery version 1.2.6. But WP 2.3.2 includes version 1.1.4 so it will probably be ok. I haven't tested ThickBox with jQuery 1.3 yet. The version included with WordPress is safe to be used along with scriptaculous, mootools and other libraries.

== Screenshots ==

1. Options page in WP 2.7
2. Inline video when not using ThickBox.
3. Inline image when using ThickBox (play icon automatically added).
4. Video in ThickBox.


