<?php
$userBrowser = $_SERVER['HTTP_ACCEPT']; 
if(stristr($userBrowser, 'application/vnd.wap.xhtml+xml')) 
{
$_REQUEST['wap2'] = 1;
}

elseif(stripos($_SERVER['HTTP_USER_AGENT'],"iPod"))
{
$_REQUEST['iphone'] = 1;

}
elseif(stripos($_SERVER['HTTP_USER_AGENT'],"iPhone"))
{
$_REQUEST['iphone'] = 1;

}
elseif(stripos($_SERVER['HTTP_USER_AGENT'],"Android"))
{
$_REQUEST['Android'] = 1;

}
elseif(stripos($_SERVER['HTTP_USER_AGENT'],"IEMobile"))
{
$_REQUEST['IEMobile'] = 1;

}
elseif(stristr($userBrowser, 'DoCoMo/' || 'portalmmm/'))
{
$_REQUEST['imode'] = 1;
}

elseif(stristr($userBrowser, 'text/vnd.wap.wml')) 
{
$_REQUEST['wap'] = 1;
}
elseif(stristr($userBrowser, 'text/html')) 
{
$_REQUEST['html'] = 1;
}


if(!defined('WAP'))
	define('WAP', isset($_REQUEST['wap']) || isset($_REQUEST['wap2']) || isset($_REQUEST['imode'])|| isset($_REQUEST['html'])|| isset($_REQUEST['Android'])|| isset($_REQUEST['iphone'])|| isset($_REQUEST['IEMobile']));
	
	if (WAP)
{
	define('WIRELESS_PROTOCOL', isset($_REQUEST['wap']) ? 'wap' : (isset($_REQUEST['wap2']) ? 'wap2' : (isset($_REQUEST['iphone']) ? 'iphone' : (isset($_REQUEST['imode']) ? 'imode' : (isset($_REQUEST['IEMobile']) ? 'IEMobile' :(isset($_REQUEST['html']) ? 'html' : (isset($_REQUEST['Android']) ? 'Android' : '')))))));  

if (WIRELESS_PROTOCOL == 'wap')
	  {
$browser_t = "mobile";
	  }
elseif (WIRELESS_PROTOCOL == 'wap2')
	  {


$browser_t = "mobile";


	  }
elseif (WIRELESS_PROTOCOL == 'imode')
	  {
	
$browser_t = "mobile";

	  }
	  elseif (WIRELESS_PROTOCOL == 'iphone')
	  {
	

$browser_t = "smartphone";

	  }
	  elseif (WIRELESS_PROTOCOL == 'Android')
	  {
	

$browser_t = "smartphone";

	  }
	   elseif (WIRELESS_PROTOCOL == 'IEMobile')
	  {
	
$browser_t = "smartphone";

	  }
	  elseif (WIRELESS_PROTOCOL == 'html')
	  {

	 $mobile_browser = '0';

if(preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone)/i',
    strtolower($_SERVER['HTTP_USER_AGENT']))){
    $mobile_browser++;
    }

if((strpos(strtolower($_SERVER['HTTP_ACCEPT']),'application/vnd.wap.xhtml+xml')>0) or 
    ((isset($_SERVER['HTTP_X_WAP_PROFILE']) or isset($_SERVER['HTTP_PROFILE'])))){
    $mobile_browser++;
    }

$mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'],0,4));
$mobile_agents = array(
    'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
    'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
    'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
    'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
    'newt','noki','oper','palm','pana','pant','phil','play','port','prox',
    'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
    'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
    'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
    'wapr','webc','winw','winw','xda','xda-');

if(in_array($mobile_ua,$mobile_agents)){
    $mobile_browser++;
    }
if (strpos(strtolower($_SERVER['ALL_HTTP']),'OperaMini')>0) {
    $mobile_browser++;
    }
		if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']),'iemobile')>0) {
$mobile_browser++;
}
if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']),'windows')>0) {
    $mobile_browser=0;
    }


if($mobile_browser>0){
   // do something wap

$browser_t = "mobile";

}
// non-mobile
else
{

$_SESSION['Browser_d'] = "web";
$browser_t = "web";

}
   } else {
   // do something else html
  
$_SESSION['Browser_d'] = "web";
$browser_t = "web";
   }

	  }
	 
	
	else
	{
$mobile_browser = '0';

if(preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone)/i',
    strtolower($_SERVER['HTTP_USER_AGENT']))){
    $mobile_browser++;
    }

if((strpos(strtolower($_SERVER['HTTP_ACCEPT']),'application/vnd.wap.xhtml+xml')>0) or 
    ((isset($_SERVER['HTTP_X_WAP_PROFILE']) or isset($_SERVER['HTTP_PROFILE'])))){
    $mobile_browser++;
    }

$mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'],0,4));
$mobile_agents = array(
    'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
    'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
    'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
    'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
    'newt','noki','oper','palm','pana','pant','phil','play','port','prox',
    'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
    'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
    'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
    'wapr','webc','winw','winw','xda','xda-');

if(in_array($mobile_ua,$mobile_agents)){
    $mobile_browser++;
    }
	if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']),'iemobile')>0) {
$mobile_browser++;
}
if (strpos(strtolower($_SERVER['ALL_HTTP']),'OperaMini')>0) {
    $mobile_browser++;
    }
if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']),'windows')>0) {
    $mobile_browser=0;
    }


if($mobile_browser>0){
   // do something wap
 
$browser_t = "mobile";

}
// non-mobile
else
{
$_SESSION['Browser_d'] = "web";
$browser_t = "web";
}
   
	}
	 ?>