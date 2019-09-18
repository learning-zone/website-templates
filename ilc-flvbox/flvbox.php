<?php
/*
Plugin Name: ILC FLVBox
Plugin URI: http://ilovecolors.com.ar/wordpress-plugin-ilc-flvbox-flv-video-using-thickbox/
Description: Shows flv video as inline content or in modal dialog. Uses <a href="http://miplayweb.com/player/" target="_blank">MiPlayWeb</a>, <a href="http://osflv.com/" target="_blank">OSFLV Player</a> and <a href="http://jquery.com/demo/thickbox/" target="_blank">ThickBox</a>.
Version: 1.0.5
Author: Elliot
Author URI: http://ilovecolors.com.ar/

ToDo:
	1) Add separate options pages for players.
	2) Add complete localization for admin options page
	3) Add shortcodes.
	4) Integrate other modal dialogs like nyroModal.
	5) Add bundled styles for modal dialogs.

*/

/*Global variables*/
$flvbox_dir = get_bloginfo('url') . get_option('ilc_flvbox_path');
$flvbox_width = get_option('ilc_flvbox_width');
$flvbox_height= get_option('ilc_flvbox_height');
$flvbox_style = dirname(__FILE__) . '/flvbox.css';


/*-_-_-_-_-_-_-_-_-_-_-_-_ PLUGIN CONTENT PROCESSING _-_-_-_-_-_-_-_-_-_-_-_*/

/*Scripts and styles are added to the head of the rendered page*/

function ilc_flvbox_init(){
	global $flvbox_dir;
	if(get_option('ilc_tb') == 'on') {
			wp_enqueue_script('jquery');
			wp_enqueue_script('thickbox');
			wp_enqueue_style ('thickbox');
			wp_enqueue_style ('flvbox', $flvbox_dir . 'flvbox.css', false, false, 'screen');
	}
	wp_enqueue_script('swfobject15', $flvbox_dir . 'swfobject15.js', false, '1.5');
}

function ilc_flvbox_wphead() {
	global $flvbox_dir;
	global $flvbox_width;
	global $flvbox_height;
?>
	<!-- begin ilc_flvbox scripts -->
	<?php
	if(get_option('ilc_tb') == 'on') {?>
		<script type="text/javascript">
		//<![CDATA[ 
		var tb_pathToImage = "<?php echo get_bloginfo('url'); ?>/wp-includes/js/thickbox/loadingAnimation.gif";
		var tb_closeImage = "<?php echo get_bloginfo('url'); ?>/wp-includes/js/thickbox/tb-close.png";
		//]]>
		</script>
	<?php	} ?>
	
	<script type="text/javascript">
	//<![CDATA[
	function ilc_loadVideo(thisVideo)
	{
		var ver = "9.0.0";
		var bgc = "#000000";
		<?php if (get_option('ilc_player') == 0) {
				if(get_option('ilc_tb') == 'on') { $ilc_flvbox_osflv_ap = '1';} else { $ilc_flvbox_osflv_ap = '0';}
		?>
			var so = new SWFObject("<?php echo $flvbox_dir; ?>mpwplayer.swf?flv=" + thisVideo + ".flv" + "&jpg=" + thisVideo + ".jpg&autoplay=" + <?php
			echo $ilc_flvbox_osflv_ap ; ?>, thisVideo, "<?php echo $flvbox_width; ?>", "<?php echo $flvbox_height; ?>", ver, bgc, true);
		<?php } else if (get_option('ilc_player') == 1){
				if(get_option('ilc_tb') == 'on') { $ilc_flvbox_osflv_ap = 'on';} else { $ilc_flvbox_osflv_ap = 'off';}
		?>
			var so = new SWFObject("<?php echo $flvbox_dir; ?>player.swf?movie=" + thisVideo + ".flv&bgcolor=0x<?php echo get_option('ilc_flvbox_osflv_bgcolor'); ?>&fgcolor=0x<?php echo get_option('ilc_flvbox_osflv_fgcolor'); ?>&volume=<?php echo get_option('ilc_flvbox_osflv_volume'); ?>&autoplay=<?php echo $ilc_flvbox_osflv_ap; ?>", thisVideo, "<?php echo $flvbox_width; ?>", "<?php echo $flvbox_height; ?>", ver, bgc, true);
		<?php } ?>
		so.addParam("allowfullscreen", "true");
		so.addParam("wmode", "transparent");
		so.write(thisVideo);
	}
	//]]>
	</script>

	<!-- end ilc_flvbox scripts -->
<?php
}
/*Adds inline or modal FLV player by filtering the content looking for links to FLV files.*/
function ilc_flvbox_add($content){
	
	global $flvbox_dir;
	global $flvbox_width;
	global $flvbox_height;
	
	$flvbox_tb_height = $flvbox_height;
	$flvbox_tb_width  = $flvbox_width;
	
	$pattern = "/<a(.*?)href=('|\")([^>]*).(flv)('|\")(.*?)>(.*?)<\/a>/i";
	if(get_option('ilc_tb') == 'on')
			$replacement = '<div class="ilc_flvbox_inlineimg"><a href="#TB_inline?height=' . $flvbox_tb_height . '&width=' . $flvbox_tb_width . '&inlineId=ilc_flvbox_content" class="thickbox flvbox">
			<div class="ilc_flvbox_play"></div><img src="$3.jpg" /></a></div>
			<div id="ilc_flvbox_content" style="display:none">';
			
		$replacement .= '<div id="$3" class="flvbox_inline">You need Flash</div><script type="text/javascript">ilc_loadVideo("$3");</script>';
	
	if(get_option('ilc_tb') == 'on')
			$replacement .= '</div>';
	
	$content = preg_replace($pattern, $replacement, $content);
	return $content;
}

add_action('init', 'ilc_flvbox_init');
add_action('wp_head', 'ilc_flvbox_wphead');
add_filter('the_content', 'ilc_flvbox_add');



/*-_-_-_-_-_-_-_-_-_-_-_-_ PLUGIN ADMIN OPTIONS PAGE _-_-_-_-_-_-_-_-_-_-_-_*/
/*wp-admin options page*/
function ilc_flvbox_options(){
	global $flvbox_style;
	wp_enqueue_script('jquery');

	?>
	
<script type="text/javascript">
			jQuery(document).ready(function(){
				jQuery('#ilc_flvbox_tb').click(function(event){ 
					jQuery('#ilc_flvbox_css_div').slideToggle('slow');
				});
				jQuery('#osflv').click(function(event){ 
					jQuery('#ilc_flvbox_osflv_div').slideDown('slow');
				});
				jQuery("#miplayweb").click(function(event){ 
					jQuery('#ilc_flvbox_osflv_div').slideUp('slow');
				});
			});
</script>
	
<div class="wrap">
<h2><?php _e('ILC FLVBox Options'); ?></h2>



<form method="post" action="options.php">
<?php wp_nonce_field('update-options'); ?>

<table class="form-table">
	<tr valign="top">
		<th scope="row"><?php _e('Select FLV Player') ?></th>
		<td>
			
			<input id="miplayweb" type="radio" name="ilc_player" value="0" <?php if(get_option('ilc_player') == 0) echo "checked=\"checked\""; ?>/>
			<label for="miplayweb"><?php _e('Use '); ?><a href="http://miplayweb.com/player/" target="_blank">MiPlayWeb </a></label>
			<br/>
			<input id="osflv" type="radio" name="ilc_player" value="1" <?php if(get_option('ilc_player') == 1) echo "checked=\"checked\""; ?>/>
			<label for="osflv"><?php _e('Use '); ?><a href="http://osflv.com/" target="_blank">OSFLV Player</a></label>
			<br/>
			<small><?php _e('Select the player for the flv files.'); ?></small>
			<div id="ilc_flvbox_osflv_div" <?php if(get_option('ilc_player') != 1) echo "style=\"display:none\""; ?>>
				<input type="text" name="ilc_flvbox_osflv_bgcolor" size="6" value="<?php echo get_option('ilc_flvbox_osflv_bgcolor'); ?>" />
				<small><?php _e('OSFLV background elements color.'); ?></small>
				<br/>
				<input type="text" name="ilc_flvbox_osflv_fgcolor" size="6" value="<?php echo get_option('ilc_flvbox_osflv_fgcolor'); ?>" />
				<small><?php _e('OSFLV foreground elements color.'); ?></small>
				<br/>
				<input type="text" name="ilc_flvbox_osflv_volume" size="6" value="<?php echo get_option('ilc_flvbox_osflv_volume'); ?>" />
				<small><?php _e('OSFLV initial volume level.'); ?></small>
			</div>
		</td>
	</tr>
	
	<tr valign="top">
		<th scope="row"><?php _e('FLVBox dimensions') ?></th>
		<td>
			<input type="text" name="ilc_flvbox_width" size="6" value="<?php echo get_option('ilc_flvbox_width'); ?>" />
			<small><?php _e('Width of the video box.'); ?></small>
			<input type="text" name="ilc_flvbox_height" size="6" value="<?php echo get_option('ilc_flvbox_height'); ?>" />
			<small><?php _e('Height of the video box.'); ?></small>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row"><?php _e('FLVBox plugin path') ?></th>
		<td>
			<input type="text" name="ilc_flvbox_path" size="33" value="<?php echo get_option('ilc_flvbox_path'); ?>" />
			<p><small><?php _e('Just in case. You shouldn\'t need to change this.'); ?></small></p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row"><?php _e('Use modal dialog') ?></th>
		<td>
			<input id="ilc_flvbox_tb" type="checkbox" name="ilc_tb" <?php if(get_option('ilc_tb') == 'on') echo "checked=\"checked\"";?>/>
			<label for="tb">
				<?php _e('If you check this option, the video will play on a modal dialog managed by ThickBox.'); ?>
			</label>
		</td>
	</tr>
</table>



<input type="hidden" name="action" value="update" />
<input type="hidden" name="page_options" value="ilc_flvbox_path,ilc_player,ilc_tb,ilc_flvbox_width,ilc_flvbox_height,ilc_flvbox_osflv_bgcolor,ilc_flvbox_osflv_fgcolor,ilc_flvbox_osflv_volume" />

<p class="submit">
<input type="submit" name="Submit" value="<?php _e('Save Changes') ?>" class="button-primary" />
</p>

</form>

<form id="editcss" method="post" action="" name="EditCSS">

	<div id="ilc_flvbox_css_div" style="margin-left:230px;" <?php if(get_option('ilc_tb') != 'on') echo "style=\"display:none\""; ?> >
		<?php 
		/*Save CSS file*/
		if(!empty($_POST['SubmitCSS'])){
		$newStyle = stripslashes($_POST['ilc_flvbox_css']);
		if(is_writeable($flvbox_style)) {
		    $fow = fopen($flvbox_style, 'w+');
		    fwrite($fow, $newStyle);
			fclose($fow);
		    echo '<div id="message" class="updated fade"><p><strong>Stylesheet saved.</strong></p></div>';
		}
		else {
			echo '<div id="message" class="updated fade"><p><strong>There has been an error trying to write the file. Are you sure you have permission to do so?</strong></p></div>';
		}
	}
		?>
		<h3><?php _e('Preview Image Style') ?></h3>
		<p><small><?php _e('Set below the CSS style for the image that will be shown');?></small></p>
		<textarea name="ilc_flvbox_css" cols="60" rows="10"><?php
			if( is_file($flvbox_style) && filesize($flvbox_style) > 0) {
				$fo = "";	
				$fo = fopen($flvbox_style, 'r');
				$fr = fread($fo, filesize($flvbox_style));
				echo $fr;
				fclose($fo);
			}
			else _e('The file you\'re looking for can\'t be found.');?>	</textarea>
		<p><input type="submit" name="SubmitCSS" class="button-secondary" value="<?php _e('Update Changes &raquo;'); ?>"/></p>
	</div>
	

</form>
</div>

<?php
}
/*Creates Settings link on plugins list page. Taken from Ozh Admin Menu.*/
function ilc_flvbox_settings($links, $file) {
	if ($file == plugin_basename(dirname(__FILE__).'/flvbox.php')) {
		foreach($links as $k=>$v) {
			if (strpos($v, 'plugin-editor.php?file=') !== false)
				unset($links[$k]);
		}
		$links[] = "<a href='options-general.php?page=".plugin_basename(dirname(__FILE__))."/flvbox.php'><b>Settings &raquo;</b></a>";
	}
	return $links;
}
/*Add Settings link on plugins page. Create options page on wp-admin.*/
function ilc_flvbox_plugin_menu() {
	add_filter( 'plugin_action_links', 'ilc_flvbox_settings', -10, 2);
	add_options_page('FLVBox Options', 'FLVBox Options', 8, __FILE__, 'ilc_flvbox_options');
}
add_action('admin_menu', 'ilc_flvbox_plugin_menu');

/*When the plugin is activated, we setup some options on the database*/
function ilc_flvbox_activate(){
	add_option("ilc_tb", "on");
	add_option("ilc_player", "0");
	add_option("ilc_flvbox_width", "427");
	add_option("ilc_flvbox_height", "320");
	add_option("ilc_flvbox_path", "/wp-content/plugins/ilc-flvbox/");
	add_option("ilc_flvbox_osflv_bgcolor", "999999");
	add_option("ilc_flvbox_osflv_fgcolor", "333333");
	add_option("ilc_flvbox_osflv_volume", "75");	
	/*	Just in case you delete the css file
	.flvbox img{
		background-color:#CCCCCC;
		border:5px solid #DDDDDD;
		padding: 1px;
	}
	a.flvbox {
		background:none !important;
		border-bottom:none !important;
	}
	a.flvbox:hover{
		border-bottom: 1px dotted #d00 !important;
	}
	.ilc_flvbox_inlineimg{
		margin:0 auto;
		position:relative;
		width:50%;
	}
	.ilc_flvbox_play{
		background: url(play.gif) no-repeat top left #000;
		position: absolute;
		top: 40%;
		left: 50%;
		width: 40px; height:40px;
	}
	*/
}
/*When the plugin is deactivated, we will erase all options from database*/
function ilc_flvbox_deactivate(){
	delete_option("ilc_tb");
	delete_option("ilc_player");
	delete_option("ilc_flvbox_path");
	delete_option("ilc_flvbox_width");
	delete_option("ilc_flvbox_height");
	delete_option("ilc_flvbox_osflv_bgcolor");
	delete_option("ilc_flvbox_osflv_fgcolor");
	delete_option("ilc_flvbox_osflv_volume");
}

register_activation_hook( __FILE__, 'ilc_flvbox_activate');
register_deactivation_hook(__FILE__, 'ilc_flvbox_deactivate');



?>