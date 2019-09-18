<?php
/*
	Thumnbnail generator for EasyImageCatalogue
	requires gd_lib to be installed.
*/
include_once("eic_functions.php");
$HTML=load("thumber_template.html");
$dir=$HTTP_GET_VARS['dir'];
$p=$HTTP_GET_VARS['p'];
if ($dir==""){
	$allfiles=directory(".","all");
	natsort($allfiles);
	$folders="";
	foreach ($allfiles as $a){
	if (!preg_match("/^\.|counterdata/",$a) and is_dir($a)){
		$folders.="<a href=\"".$SERVER_VARS['PHP_SELF']."?dir=$a\">$a</a><br>";
		}
	}
	$HTML=preg_replace("/<!-- folders -->/sm",$folders,$HTML);
	$HTML=preg_replace("/<!-- start:thumbs -->(.*?)<!-- end:thumbs -->/sm","",$HTML);
}
if ($p!=""){
	$p=explode("/",$p);
	chdir($p[0]);
	copy ($p[1],"preview.jpg");
	chdir("..");
}
if ($dir!=""){
	$allimages=directory($dir,"jpg,JPG,jpeg,JPEG,png,PNG");
	$allimages=ditchtn($allimages);
	natsort($allimages);
	$thumbs="";
	foreach($allimages as $dfile){
		createthumb($dir."/".$dfile,$dir."/tn_".$dfile,100,100); 
		$thumbs.="<a href=\"".$SERVER_VARS['PHP_SELF']."?p=$dir/tn_$dfile\"><img src=\"$dir/tn_$dfile\" border=\"0\" /></a>";
	}
	$HTML=preg_replace("/<!-- start:folders -->(.*?)<!-- end:folders -->/sm","",$HTML);
	$HTML=preg_replace("/<!-- thumbs -->/sm",$thumbs,$HTML);
}
echo $HTML;
?>
