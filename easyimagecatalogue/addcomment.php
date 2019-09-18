<?php 
/* 
	add comment for EasyImageCatalogue
	written by Christian Heilmann
*/
include_once("eic_functions.php");
$HTML=load("addcomment_template.html");
$name=$HTTP_POST_VARS['name'];
$d=$HTTP_POST_VARS['d'];
$p=$HTTP_POST_VARS['p'];
$text=$HTTP_POST_VARS['text'];
$action=$HTTP_POST_VARS['action'];
$c=$HTTP_POST_VARS['c'];
if ($c==""){$c=$HTTP_GET_VARS['c'];}
if ($d==""){$c=$HTTP_GET_VARS['p'];}
if ($p==""){$c=$HTTP_GET_VARS['d'];}
if ($action=="add"){
	if ($name=="" or $text==""){$msg="Please enter both fields, thank you.";}
	else {
		$comments=load("counterdata/".$c."_comments.xml");
		$xml="<?xml version=\"1.0\"?>";
		$xml.="\n<comments>";
		$xml.=untag($comments,"comments",0);
		$xml.="\n\t<comment>";
		$xml.="\n\t\t<name>".stripslashes(htmlentities($name))."</name>";
		$xml.="\n\t\t<text>".stripslashes(nl2br(htmlentities($text)))."</text>";
		$xml.="\n\t</comment>";
		$xml.="\n</comments>";
		save("counterdata/".$d.str_replace(".","",$p)."_comments.xml",$xml);
		header("Location:index.php?d=$d&p=$p");
	}
}
$HTML=preg_replace("/%c%/",$c,$HTML);
$HTML=preg_replace("/%p%/",$p,$HTML);
$HTML=preg_replace("/%d%/",$d,$HTML);
$HTML=preg_replace("/%name%/",$name,$HTML);
$HTML=preg_replace("/%text%/",$text,$HTML);
if ($msg !=""){$HTML=preg_replace("/<!-- message -->/","<h4>$msg</h4>",$HTML);}
$HTML=preg_replace("/<!-- thumb -->/","<img src=\"$d/tn_$p\" />",$HTML);
echo $HTML;
?>
