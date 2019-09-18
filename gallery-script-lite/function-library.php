<?php

function createhtmlname($name) {
  $replace_values = array(" ", "'", "\"", "\\", "/", "?", "|", "@", "#", "~", "!", "£", "$", "%", "^", "&", "*", "(", ")", "[", "]", "{", "}", "+", "=", "-");
  $name = str_replace($replace_values, "_", $name);
  $name = str_replace(".", "", $name);
  $name = str_replace(",", "", $name);
  return strtolower($name);
}

function randomfilename() {
$salt = "0123456789abcdefghijklmnopqrstuvwxyz"; 
srand((double)microtime()*1000000); 
  $i = 0; 
  while ($i <= 25) { 
		$num = rand() % 33; 
		$tmp = substr($salt, $num, 1); 
		$nname = $nname . $tmp; 
		$i++; 
  } 
  return $nname; 
}

function count_photos($folder) {
  global $storage_location;
  $dir_handle = @opendir($storage_location.$folder);
  $total = 0;
  while ($file = readdir($dir_handle)) {
	  if(($file != ".") && ($file != "..")) {
	    $exp   = explode(".", $file);
		$where = COUNT($exp)-1;
		$ext   = $exp[$where];
		if(($ext == "jpg") || ($ext == "jpeg") || ($ext == "pjpg") || ($ext == "png") || ($ext == "gif")) $total++;
	  }
  }
  closedir($dir_handle);
  return $total;
}

function load_photos($folder) {
  global $storage_location;
  $file_listing = array();
  $dir_handle = @opendir($storage_location.$folder);
  while ($file = readdir($dir_handle)) {
	  if(($file != ".") && ($file != "..")) {
	    $exp   = explode(".", $file);
		$where = COUNT($exp)-1;
		$ext   = $exp[$where];
		$title = $exp[0];
	    if(($ext == "jpg") || ($ext == "jpeg") || ($ext == "pjpg") || ($ext == "png") || ($ext == "gif")) $file_listing[] = array('path'=>$storage_location.$folder."/".$file, 'filename'=>$file, 'title'=>$title, 'ext'=>$ext);
	  }
  }
  closedir($dir_handle);
  return $file_listing;
}

function galleryImage ($path, $max_x, $justurl = FALSE) {

  include_once("config.inc.php");

  $sourceImagePath = $path;
  $targetImagePath = "cache/".MD5($path.$max_x).".jpg";
  $outputImageQuality = 80;

  /* Check if file is already cached, if so just deliver existing image */
  if(!file_exists($targetImagePath)) {

    /* MAIN RESIZING SCRIPT */
	
    /* Load Dimensions of Original Image */
    $originalImageSize = getimagesize($sourceImagePath);
    $original_x = $originalImageSize[0];
    $original_y = $originalImageSize[1];

    if($original_x > $original_y) {
      $max_y = 0;
      $max_x = $max_x;
    }
    else if($original_x < $original_y) {
      $max_y = $max_x;
      $max_x = 0;
    }
    else {
      $max_y = $max_x;
      $max_x = $max_x;
    }

    /* Work out ratios and which way to crop */
    $state = 0;
    if($square == 1) {
      if($max_x == 0) $max_x = $max_y;
      elseif($max_y == 0) $max_y = $max_x;
    }
    if($max_x == 0) $state = 1;
    elseif($max_y == 0) $state = 2;
    if($state == 0) {
      $testratio = $max_x / $max_y;
      $origratio = $original_x / $original_y;
      if($origratio > $testratio) $state = 1;
      elseif($origratio < $testratio) $state = 2;
      else $state = 3;
    }

    /* With ratios sorted, plot co-ordinates */

    if($state == 1) {
      /* make new-y = max-y OR crop sides */

      if($square == 0) {
        if(($original_y > $max_y) || ($enlarge == 1)) $new_y = $max_y;
        else $new_y = $original_y;
        $new_x = round(($original_x / ($original_y / $new_y)), 0);
        $srcx = 0;
        $srcy = 0;
        $srcw = $original_x;
        $srch = $original_y;
      }

      else {
        if(($original_y > $max_y) || ($enlarge == 1)) $new_y = $max_y;
        else $new_y = $original_y;
        $new_x = $new_y;
        $tempratio = ($original_y / $new_y);
        $sectionwidth = $new_y * $tempratio;
        $srcy = 0;
        $srch = $original_y;
        $srcx = floor(($original_x - $sectionwidth) / 2);
        $srcw = floor($sectionwidth);
      }

    }

    elseif($state == 2) {
      /* make new-x = max-x OR crop top & bottom */
      
      if($square == 0) {
        if(($original_x > $max_x) || ($enlarge == 1)) $new_x = $max_x;
        else $new_x = $original_x;
        $new_y = round(($original_y / ($original_x / $new_x)), 0);
        $srcx = 0;
        $srcy = 0;
        $srcw = $original_x;
        $srch = $original_y;
      }

      else {
        if(($original_x > $max_x) || ($enlarge == 1)) $new_x = $max_x;
        else $new_x = $original_x;
        $new_y = $new_x;
        $tempratio = ($original_x / $new_x);
        $sectionheight = $new_x * $tempratio;
        $srcx = 0;
        $srcw = $original_x;
        $srcy = floor(($original_y - $sectionheight) / 2);
        $srch = floor($sectionheight);
      }

    }

    elseif($state == 3) {
      /* original image ratio = new image ratio - use all of image */

      if($square == 0) {
        if(($original_x > $max_x) || ($enlarge == 1)) $new_x = $max_x;
        else $new_x = $original_x;
        $new_y = round(($original_y / ($original_x / $new_x)), 0);
        $srcx = 0;
        $srcy = 0;
        $srcw = $original_x;
        $srch = $original_y;
      }

      else {
        if(($original_x > $max_x) || ($enlarge == 1)) $new_x = $max_x;
        else $new_x = $original_x;
        $new_y = $new_x;
        $srcx = 0;
        $srcy = 0;
        $srcw = $original_x;
        $srch = $original_y;
      }

    }

    /* Do Conversion */
	if(strstr(strtolower($path), ".jpg")) $originalImage = ImageCreateFromJPEG($sourceImagePath);
	elseif(strstr(strtolower($path), ".jpeg")) $originalImage = ImageCreateFromJPEG($sourceImagePath);
	elseif(strstr(strtolower($path), ".pjpg")) $originalImage = ImageCreateFromJPEG($sourceImagePath);
	elseif(strstr(strtolower($path), ".png")) $originalImage = ImageCreateFromPNG($sourceImagePath);
	elseif(strstr(strtolower($path), ".gif")) $originalImage = ImageCreateFromGIF($sourceImagePath);
    $newImage = ImageCreateTrueColor($new_x, $new_y);
    ImageCopyResampled ($newImage, $originalImage, 0, 0, $srcx, $srcy, $new_x, $new_y, $srcw, $srch);
    ImageJPEG ($newImage, $targetImagePath, $outputImageQuality);
    ImageDestroy($newImage);
    ImageDestroy($originalImage);

  }

  /* Output Image */
  $imageSize = getimagesize($targetImagePath);
  if($justurl == TRUE) return $targetImagePath;
  else return "<img src=\"$targetImagePath\" width=\"$imageSize[0]\" height=\"$imageSize[1]\" border=\"0\" style=\"border:1px solid #000000;\">";

}
  
?>