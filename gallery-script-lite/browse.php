<?php

include_once("config.inc.php");
include_once("function-library.php");

// get vars
$catname = $_GET['catname'];
$next    = $_GET['next'];
$prev    = $_GET['prev'];
$catname = urldecode($catname);
if(!$next) $next = 0;
if(!$prev) $prev = 0;
if($thumbnail_w > 800) $thumbnail_w = 800;

$pagetitle = "Browsing ".UCWords(strtolower($catname))." Album";
$meta_keywords    = str_replace(" ", ", ", $catname);
$meta_description = "Browsing ".UCWords(strtolower($catname))." Album";
include_once("header.php");

// count images
$total = count_photos($catname);

if($total == 0) {
  echo "<div align=\"center\" class=\"indexhead\"><b>".$catname." Album</b></div><br>";
  echo "<div align=\"center\">No images in this category.</div><br><br>";
}
else {
	$r = 1;
	echo "<table width=\"100%\" cellpadding=\"2\" cellspacing=\"0\" align=\"center\">";
	echo "<div align=\"center\" class=\"indexhead\"><b>".$catname." Album</b></div><br>";
	echo "<div align=\"center\">There are ".$total." images in this album.</div><br><br>";

	$tracker = 1;
	$photos = load_photos($catname);
	foreach($photos AS $row) {

	  if(($tracker > $next) && ($tracker <= ($next+$perpage))) {

		if($r == 1) echo "<tr>";
		
		echo "<td align=\"center\" valign=\"bottom\">";

		echo "<table width=\"".$thumbnail_w."\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=\"center\" class=\"thumbtitle\">";
		echo $row[title];
		echo "</td></tr></table>";

		echo "<table width=\"".$thumbnail_w."\" cellpadding=\"2\" cellspacing=\"0\" bgcolor=\"".$listing_hover_off."\" style=\"border:1px solid #999999;\" style=\"cursor:hand;\" onMouseOver=\"";
		if($hover_style == 1) {
		    if(($row[ext] == "jpg") || ($row[ext] == "jpeg") || ($row[ext] == "pjpg") || ($row[ext] == "png") || ($row[ext] == "gif"))  {
			  $image_data = galleryImage($row[path], 220);
			  $image_data = str_replace("'", "\'", $image_data);
			  $image_data = str_replace("\"", "\'", $image_data);
			  echo "ddrivetip('".$image_data."','white', 160);";
			}
		}
		echo "this.style.backgroundColor='".$listing_hover_on."';\" onMouseOut=\"";
		if($hover_style != 0) echo "hideddrivetip();";
		echo "this.style.backgroundColor='#ffffff';\" onClick=\"window.location='".urlencode($catname)."/".urlencode($row[filename]).".html';\"><tr height=\"".$thumbnail_w."\"><td valign=\"middle\" align=\"center\"><a href='".urlencode($catname)."/".urlencode($row[filename]).".html'>";
		if(($row[ext] == "jpg") || ($row[ext] == "jpeg") || ($row[ext] == "pjpg") || ($row[ext] == "png") || ($row[ext] == "gif")) echo galleryImage($row[path], $thumbnail_w);
		else echo "<img src=\"images/uns-thumb.jpg\" alt=\"keywords: $row[title]\" border='0'>";
		echo "</a></td></tr></table>";
		 
		if($r == $browse_cols) {
		  echo "</td></tr>";
		  $r = 1;
		}
		else {
		  echo "</td>";
		  $r++;
		}
		 
	  }
	  $tracker++;
	}
	echo "</table>";
}

if(isset($next)) {
  $next = $next + $perpage;
  $prev = $next - $perpage*2;
}
elseif(isset($prev)) {
  $next = $prev + $perpage;
  $prev = $prev - $perpage;
}
echo "<br><div align=\"center\" class=\"headtext\" style=\"margin-top:7px;\">";
if($prev >= 0) echo "<- <a href=\"".urlencode($catname)."?prev=$prev\">BACK PAGE</a>&nbsp;";
if($next < $total) echo "&nbsp;<a href=\"".urlencode($catname)."?next=$next\">NEXT PAGE</a> ->";

echo "<br><br><div align=\"center\" class=\"headtext\" style=\"margin-top:7px;\"><a href=\"".$site_path."\">HOME</a><br>";

include_once("footer.php");

?>