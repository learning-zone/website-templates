<?php

include_once("config.inc.php");
include_once("function-library.php");

// get vars
$catname = $_GET['catname'];
$catname = urldecode($catname);
$imageid = $_GET['id'];
$imageid = urldecode($imageid);
$path    = $storage_location.$catname."/".$imageid;
if($image_w > 1200) $image_w = 1200;

$pagetitle = "Viewing image ".UCWords(strtolower($imageid))." in ".$catname." Album";
$meta_keywords    = str_replace(" ", ", ", $imageid).", ".str_replace(" ", ", ", $catname);
$meta_description = "Viewing image ".UCWords(strtolower($imageid))." in ".$catname." Album";
include_once("header.php");

echo "<table width=\"100%\" cellpadding=\"2\" cellspacing=\"0\" align=\"center\"><tr>";

echo "<td align=\"center\" valign=\"top\">";
echo "<b><font class='viewhead'>".$imageid."</font></b><br><br>";

  echo str_replace("cache", "../cache", galleryImage($path, $image_w, FALSE));
  
  echo "<br><br><br><a href=\"../".urlencode($catname)."\">RETURN TO THUMBNAILS</a>";
  
echo "</td>";
echo "</tr></table>";

include_once("footer.php");

?>