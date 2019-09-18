<?php
  
  if (strlen($pagetitle) == 0) $pagetitle = $site_name;
  $pagetitle = $pagetitle." - ".$site_name;
  
?>
<html>
  <head>
    <title><?php echo $pagetitle; ?></title>
    <META http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <META NAME="keywords" CONTENT="<?php echo $meta_keywords; ?>">
    <META NAME="description" CONTENT="<?php echo $meta_description; ?>">
	<script type="text/javascript" src="<?php echo $site_path; ?>flashobject.js"></script>
    <link rel="stylesheet" href="<?php echo $site_path; ?>styles.css">
    <style type="text/css">
		#dhtmltooltip{
			position: absolute;
			width: 200px;
			border: 2px solid black;
			padding: 2px;
			background-color: lightyellow;
			visibility: hidden;
			z-index: 100;
		}
		#flashcontent {
			height: 100%;
		}
	</style>
  </head>
<body style="background: <?php echo $main_bg; ?> url('<?php echo $site_path; ?>images/main-bg.jpg'); background-repeat: no-repeat; margin:0px; margin-top:15px;" <?php if($hover_style != 0) echo 'onLoad="cacheOff()"'; ?>>
<div id="dhtmltooltip"></div>

<?php
if($hover_style != 0) {
?>

	<script type="text/javascript">

	var offsetxpoint=-60
	var offsetypoint=20
	var ie=document.all
	var ns6=document.getElementById && !document.all
	var enabletip=false
	if (ie||ns6)
	var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""

	function ietruebody(){
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
	}

	function ddrivetip(thetext, thecolor, thewidth){
		if (ns6||ie){
			if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
			if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
			tipobj.innerHTML=thetext
			enabletip=true
			return false
		}
	}

	function positiontip(e){
		if (enabletip){
			var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
			var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
			var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
			var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20

			var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000

			if (rightedge<tipobj.offsetWidth)
			tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-tipobj.offsetWidth+"px"
			else if (curX<leftedge)
			tipobj.style.left="5px"
			else
			tipobj.style.left=curX+offsetxpoint+"px"

			if (bottomedge<tipobj.offsetHeight)
			tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+"px"
			else
			tipobj.style.top=curY+20+offsetypoint+"px"
			tipobj.style.visibility="visible"
		}
	}

	function hideddrivetip(){
	if (ns6||ie){
	enabletip=false
	tipobj.style.visibility="hidden"
	tipobj.style.left="-1000px"
	tipobj.style.backgroundColor=''
	tipobj.style.width=''
	}
	}

	document.onmousemove=positiontip

	</script>

	<STYLE TYPE="text/css">
		#cache {
		position:absolute; left=0; top:170px; z-index:10; visibility:hidden;
		}
    </STYLE>
    <SCRIPT LANGUAGE="JavaScript">
    ver = navigator.appVersion.substring(0,1)
    if (ver >= 4)
    	{
    	document.write('<DIV ID="cache"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\"><tr><td width=\"25%\"></td><td width=\"50%\"><TABLE WIDTH=100% BGCOLOR=#000000 BORDER=0 CELLPADDING=2 CELLSPACING=0 align=\"center\"><TR><TD ALIGN=center VALIGN=middle><TABLE WIDTH=100% BGCOLOR=#FFFFFF BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD ALIGN=center VALIGN=middle><FONT FACE="Arial, Verdana" SIZE=4><B><BR>LOADING IMAGE INFORMATION, PLEASE WAIT... <BR><BR> <img src=\"<?php echo $site_path; ?>images/boy.gif\"><br><br></B></FONT></TD> </TR></TABLE></TD> </TR></TABLE></td><td width=\"25%\"></td></tr></table></DIV>');
    	var navi = (navigator.appName == "Netscape" && parseInt(navigator.appVersion) >= 4);
    	var HIDDEN = (navi) ? 'hide' : 'hidden';
    	var VISIBLE = (navi) ? 'show' : 'visible';
    	var cache = (navi) ? document.cache : document.all.cache.style;
    	largeur = screen.width;

    	cache.visibility = VISIBLE;
    	}
		function cacheOff()
    	{
    	if (ver >= 4)
    		{
    		cache.visibility = HIDDEN;
    		}
    	}
    </SCRIPT>
<?php
}
?>
<table width="100%" cellpadding="0" cellspacing="0" align="center" style="background: url('<?php echo $site_path; ?>images/main-bg-bottom.gif'); background-repeat: no-repeat; background-position: bottom right;" height="100%"><tr><td valign="top">
<table width="740" cellpadding="2" cellspacing="0" align="center"><tr><td>