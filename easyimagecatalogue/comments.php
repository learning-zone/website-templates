<?
$COMMENTHTML=load("comments_template.html");
if (file_exists("counterdata/".$c."_comments.xml")){
	$comments=untag(load("counterdata/".$c."_comments.xml"),"comment",1);
	if ($comments[0]!=""){
		foreach ($comments as $k=>$comment){
			preg_match_all("/<!-- start:comment -->(.*?)<!-- end:comment -->/si",$COMMENTHTML,$item);	
			$match=$item[1][0];
			$match=preg_replace("/%name%/si",untag($comment,"name",0),$match);	
			$match=preg_replace("/%text%/si",untag($comment,"text",0),$match);	
			$inc.=$match;
		}
	}
}
if ($comments[0]==""){
	$COMMENTHTML=preg_replace("/<!-- start:comment -->.*?<!-- end:comment -->/si","",$COMMENTHTML);
}
else {
	$COMMENTHTML=preg_replace("/<!-- start:comment -->.*?<!-- end:comment -->/si",$inc,$COMMENTHTML);
	$COMMENTHTML=preg_replace("/<!-- start:nocomments -->.*?<!-- end:nocomments -->/si","",$COMMENTHTML);
}
$COMMENTHTML=preg_replace("/%c%/",$c,$COMMENTHTML);
$COMMENTHTML=preg_replace("/%p%/",$p,$COMMENTHTML);
$COMMENTHTML=preg_replace("/%d%/",$d,$COMMENTHTML);
return $COMMENTHTML;
?>
