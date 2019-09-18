<?php include_once("eic_functions.php");?>
<?
$HTML=load("describe_template.html");
$r=$HTTP_GET_VARS['r'];
if ($HTTP_POST_VARS['d']!=""){$d=$HTTP_POST_VARS['d'];}
else {$d=$HTTP_GET_VARS['d'];}
$action=$HTTP_POST_VARS['action'];
$p=$HTTP_GET_VARS['p'];
$a=$HTTP_GET_VARS['a'];
?>
<?
if ($d==""){
$allfiles=directory(".","all");
natsort($allfiles);
foreach ($allfiles as $a){
if (!preg_match("/^\.|counterdata/",$a) and is_dir($a)){
	$links.= "<a href=\"".$SERVER_VARS['PHP_SELF']."?d=$a\">$a</a><br />";
	}
}
$HTML=preg_replace("/<!-- galleries -->/",$links,$HTML);
}
if ($d){
if (!$action){
	$xml=load("counterdata/".$d."info.xml");
	$entries=untag($xml,"item",1);
	$rep="<form method=\"post\">";
	$rep.= "Gallery name:<br /><input type=\"text\" name=\"galleryname\" value=\"".untag($xml,"galleryname",0)."\" /><br />";
	$rep.= "Gallery description:<br /><textarea name=\"galleryinfo\">".untag($xml,"galleryinfo",0)."</textarea><br />";
	$files=directory($d,"jpg,JPG,JPEG,jpeg,png,PNG");
	$files=ditchtn($files);
	natsort($files);
	foreach ($files as $key=>$f){
	if (($key%2)==0){$rep.= "<div class=\"breaker\"></div>";}
	if ($entries[0] != ""){foreach ($entries as $e){if(untag($e,"image",0)==$f){$copy=untag($e,"copy",0);}}}
	$rep.= "<div class=\"item\"><div><a href=\"$d/$f\" target=\"_blank\"><img src=\"$d/tn_$f\" border=\"0\"></a></div>";
	$rep.= "<textarea name=\"description".preg_replace("/\..*/","",$f)."\" rows=\"3\">$copy</textarea><br />";
	$rep.= "";
	$rep.= "</div>";
	}
	$rep.= "<div align=\"right\"><input type=\"submit\" value=\"describe\" /></div>";
	$rep.= "<input type=\"hidden\" name=\"action\" value=\"describe\" />";
	$rep.= "<input type=\"hidden\" name=\"d\" value=\"$d\" />";
	$rep.= "</form>";
}
else {
	$files=directory($d,"jpg,JPG,JPEG,jpeg,png,PNG");
	$files=ditchtn($files);
	natsort($files);
	$xml="<?xml version=\"1.0\"?>";
	$xml.="\n<gallery>";
	$xml.="\n<galleryinfo>".stripslashes($HTTP_POST_VARS["galleryinfo"])."</galleryinfo>";
	$xml.="\n<galleryname>".stripslashes($HTTP_POST_VARS["galleryname"])."</galleryname>";
	foreach ($files as $f){
	$xml.="\n<item>";
	$xml.="\n\t<image>$f</image>";
	$xml.="\n\t<copy>".stripslashes($HTTP_POST_VARS["description".preg_replace("/\..*/","",$f)])."</copy>";
	$xml.="\n</item>";
	}
	$xml.="\n</gallery>";
	save("counterdata/".$d."info.xml",$xml);
	$rep.= "Done, go back <a href=\"".$SERVER_VARS['PHP_SELF']."\">here</a>";
}
$HTML=preg_replace("/<!-- galleries -->/",$rep,$HTML);
}
echo $HTML;
?>
