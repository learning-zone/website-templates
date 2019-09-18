<?php 
/*
 * A Design by W3layouts
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
 *
 */
include "app/config.php";
include "app/detect.php";

if ($page_name=='') {
	include $browser_t.'/index.html';
	}
elseif ($page_name=='index.html') {
	include $browser_t.'/index.html';
	}
elseif ($page_name=='commercial.html') {
	include $browser_t.'/commercial.html';
	}
elseif ($page_name=='industrial.html') {
	include $browser_t.'/industrial.html';
	}
elseif ($page_name=='infrastructure.html') {
	include $browser_t.'/infrastructure.html';
	}
elseif ($page_name=='resource.html') {
	include $browser_t.'/resource.html';
	}
elseif ($page_name=='contact.html') {
	include $browser_t.'/contact.html';
	}
elseif ($page_name=='datails.html') {
	include $browser_t.'/details.html';
	}
elseif ($page_name=='contact-post.html') {
	include 'app/contact.php';
	}
else
	{
		include $browser_t.'/404.html';
	}

?>
