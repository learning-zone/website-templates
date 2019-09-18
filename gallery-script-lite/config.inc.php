<?php

error_reporting(0);
set_time_limit(600);

// site details
$site_name  = "Your Site Name";             // site name/title
$site_path  = "http://www.yourdomain.com/";    // site url. Lowercase. Including the http://www. and the ending forward slash '/'. i.e. 'http://www.mysitename.com/'.

$storage_location = "pictures/";
$cache_location   = "cache/";

// album browsing pages
$hover_style = 1;   // 1 or 0 to display pop-up preview or not
$perpage     = 30;  // number of items to display on the page
$browse_cols = 6;   // number of columns on the browsing page
$thumbnail_w = 90;  // width of the thumb on browsing album page - max 800

// image preview pages
$image_w     = 600; // width of the viewed images - max 1200

// page style
$main_bg           = "#C7AB7B";  // main site background color if there's no bg image
$album_hover_on    = "#6666CC";  // album thumbnail bg hover on color - on index.html
$album_hover_off   = "#FFFFFF";  // album thumbnail bg hover off color - on index.html
$listing_hover_on  = "#FFFF99";  // listing thumbnail bg hover on color - on browse.php
$listing_hover_off = "#FFFFFF";  // listing thumbnail bg hover off color - on browse.php

?>