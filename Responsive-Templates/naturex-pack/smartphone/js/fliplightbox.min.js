/*!
 * flipLightBox - Responsive Lightbox jQuery Plugin
 * version: 1.0.1
 * @requires jQuery v1.5 or later
 *
 * License at http://flipgallery.net/fliplightbox.html#download
 * 
 * Example at http://flipgallery.net/fliplightbox.html
 *
 * Copyright 2013 flipGallery.net
 *
 */

(function( $ ){
    
$.fn.flipLightBox = function(flb_options) {

var flb_settings = $.extend({
        
        // FLIP MODE SETTINGS
        // ------------------
        
        flip_mode: 1,
        
        // 1 = Flip On & 0 = Flip Off (fade).
        
        // VISUAL SETTINGS
        // ---------------
    
        lightbox_background_opacity: 0.8,
    
        lightbox_border_width: 10, // (pixels)
    
        lightbox_border_color: '#fff',
        
        lightbox_z_index: '1000',
        
        // SPEED SETTINGS
        // --------------
        
        lightbox_flip_speed: 800,
    
        // Speed of complete lightbox flip or fade (milliseconds).
        
        // TEXT SETTINGS
        // -------------
        
        // *Picture/Lightbox Text Settings*
        
        lightbox_text_status: 1,
        
        // 1 = On & 0 = Off.
    
        lightbox_text_style: 'font-size: 14px; line-height: 1.4; color: #000; text-align: center;',
    
        lightbox_text_background_style: 'background-color: #fff; opacity:0.8;',
        
        lightbox_text_area_position: 'bottom',
        
        // bottom or top
    
        // *Picture/Lightbox Navigation Text Settings*
        
        lightbox_navigation_status: 1,
        
        // 1 = On & 0 = Off.
    
        next_image_text: 'Next &rsaquo;&rsaquo;',
    
        back_image_text: '&lsaquo;&lsaquo; Back',
    
        next_and_back_image_text_style: 'font-weight: bold; color: #000;',
    
        image_number_page: 'Image',
    
        image_number_of: 'of',
    
        image_number_text_style: 'color: #000;',

        // *Image Streaming Text Settings*

        loading_text_color: '#fff',
    
        loading_text_opacity: '0.3'
        
}, flb_options );

var flb_loading_image="data:image/gif;base64,R0lGODlhCgARAIABAP///////yH5BAEAAAEALAAAAAAKABEAAAIWTIBpl80No5y00gdXXBjxD4biSJZGAQA7";var flb_close_image="data:image/gif;base64,R0lGODlhMgAyAIABAP///////yH5BAEAAAEALAAAAAAyADIAAALPjI+py+0Po5y0HoCz3rx7/HziKDbkiWZLyp5Kd7VcvL01ImvJvOu2vPLhVAxgkTgEmVIOIQ0QcjWRT+i0dFUmqUFP1GmAZcE/sndsXfK2N3X6KGa3j5BPOW4JjO54ConfJ/HXMygoJWcXwUR46FZYtffVGIZiOKl3iXaGuDZx+egXyclVIQpJ1iPZSRnIqGrWKveqdTr71gWLOnrLd2erW1X2O4cr7GhqvHUMqszIi2mUDOnc4kudljO3Cp3djdsdfQ3OvDu+nYeerr7Ojl4AADs=";var flb_blank_image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=";var flb_image_innit_width;var flb_box_sizing='box-sizing: content-box; -moz-box-sizing: content-box; -webkit-box-sizing: content-box;';var flb_distance_from_top;var flb_new_height;var flb_new_width;var flb_placement;var flb_i;var flb_total_lightbox_width;var flb_loading;var flb_in_img;var flb_image_name;var flb_class;var flb_textcontent;var flb_lightbox_data;var flb_total_images;var fgi_lb_name='flipLightBox';var fgi_lb_ind_name;var flb_classnum=1;var flb_itemnum;var flb_clickclass;var flb_classamount=new Array();function flb_find(){if(flb_classnum==1){fgi_lb_ind_name=fgi_lb_name}else{fgi_lb_ind_name=fgi_lb_name;fgi_lb_ind_name+=flb_classnum}if($('.'+fgi_lb_ind_name)[0]){$('.'+fgi_lb_ind_name+' span').hide();flb_itemnum=0;$('.'+fgi_lb_ind_name).each(function(){flb_itemnum=flb_itemnum+1;$(this).attr('class',fgi_lb_ind_name+'-'+flb_itemnum);if(flb_clickclass==null){flb_clickclass='.'+fgi_lb_ind_name+'-'+flb_itemnum}else{flb_clickclass+=', .'+fgi_lb_ind_name+'-'+flb_itemnum}});flb_classamount[fgi_lb_ind_name]=flb_itemnum;flb_classnum++;flb_find()}}flb_find();$(this).append('<div id="flb-lightbox" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: '+flb_settings.lightbox_z_index+'; '+flb_box_sizing+'"><div id="flb-lightbox-background" style="width: 100%; height: 100%; background-color: #000; opacity:'+flb_settings.lightbox_background_opacity+'; '+flb_box_sizing+'"></div><div id="flb-lightbox-content" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none; text-align: center; '+flb_box_sizing+'"></div><div id="flb-load" style="position: fixed; top: 40%; left: 0px; width: 100%; text-align: center; font-size: 14px; color: '+flb_settings.loading_text_color+'; opacity: '+flb_settings.loading_text_opacity+'; '+flb_box_sizing+'"></div><div id="flb-lightbox-text" style="position: fixed; '+flb_settings.lightbox_text_area_position+': 0px; width: 90%; padding-left: 5%; padding-right: 6%; margin-right: auto; margin-left: auto;'+flb_settings.lightbox_text_background_style+' '+flb_settings.lightbox_text_style+' '+flb_box_sizing+' padding-top: 15px; padding-bottom: 15px;"></div><div id="flb-load2" style="position: fixed; top: 40%; left: 0px; width: 100%; text-align: center; font-size: 14px; color: '+flb_settings.loading_text_color+'; opacity: '+flb_settings.loading_text_opacity+';"></div>');$("#flb-lightbox, #flb-lightbox-content, #flb-lightbox-text").hide();function flb_get_image_width(a){var b=new Image();b.src=a;return b.width}function flb_get_image_height(a){var b=new Image();b.src=a;return b.height}function flb_iphone_check(){return((navigator.platform.indexOf("iPhone")!=-1)||(navigator.platform.indexOf("iPod")!=-1))}function flb_load_animation(){$("#flb-load").html('<div id="flb-loading-img"></div>').show();setTimeout(function(){$("#flb-loading-img").html('<br />Loading Image')},500);setTimeout(function(){$("#flb-loading-img").prepend('<img width="5" src="'+flb_loading_image+'" /> ')},1000);setTimeout(function(){$("#flb-loading-img").prepend('<img width="5" src="'+flb_loading_image+'" /> ')},1500);setTimeout(function(){$("#flb-loading-img").prepend('<img width="5" src="'+flb_loading_image+'" /> ')},2000);setTimeout(function(){$("#flb-loading-img").fadeOut(500)},2500);flb_loading=setTimeout(function(){flb_load_animation()},3000)}$(flb_clickclass).click(function(e){e.preventDefault();flb_image_name=$(this).attr('href');flb_class=$(this).attr('class');flb_textcontent=$('.'+flb_class+' span').html();flb_lightbox_data=flb_class.split('-');flb_total_images=flb_classamount[flb_lightbox_data[0]];$("#flb-lightbox-text").html('');if(flb_textcontent!=null&&flb_textcontent!=''&&flb_settings.lightbox_text_status==1){if(flb_settings.lightbox_navigation_status==1&&flb_total_images>1){$("#flb-lightbox-text").append('<br /><br />')}$("#flb-lightbox-text").append(flb_textcontent)}$("#flb-lightbox").fadeIn(flb_settings.lightbox_flip_speed/2);flb_load_animation();flb_in_img=document.createElement('img');$("<img />").attr('src',flb_image_name).load(function(){flb_in_img.onload=function(){$("#flb-load").html('');clearTimeout(flb_loading);$("#flb-lightbox-content").html('<img src="'+flb_image_name+'" id="flb-lightbox-image" style="border: solid '+flb_settings.lightbox_border_width+'px '+flb_settings.lightbox_border_color+'; '+flb_box_sizing+'"/>');if(navigator.userAgent.match('CriOS')){flb_new_width=flb_image_width=flb_in_img.width;flb_new_height=flb_image_height=flb_in_img.height}else{flb_new_width=flb_image_width=flb_get_image_width(flb_image_name);flb_new_height=flb_image_height=flb_get_image_height(flb_image_name)}if((flb_settings.lightbox_navigation_status!=1&&flb_settings.lightbox_text_status!=1)||(flb_settings.lightbox_navigation_status!=1&&(flb_textcontent==null||flb_textcontent==''))||(flb_total_images<=1&&(flb_textcontent==null||flb_textcontent==''))||(flb_total_images<=1&&flb_settings.lightbox_text_status!=1)){$("#flb-lightbox-text").css('visibility','hidden');flb_h=50}else{$("#flb-lightbox-text").css('visibility','visible');flb_h=70}$("#flb-lightbox-content").hide();setTimeout(function(){$(window).resize();$("#flb-lightbox-image").attr('src',flb_image_name).css({width:flb_image_innit_width,height:flb_new_height,opacity:0});setTimeout(function(){if($("#flb-lightbox-text").is(':hidden')){if(navigator.userAgent.match(/iPad/i)||flb_iphone_check()){$("#flb-lightbox-text").show()}else{$("#flb-lightbox-text").slideToggle()}}},flb_settings.lightbox_flip_speed);window.setTimeout(function(){$("#flb-lightbox-content").show();$("#flb-lightbox-image").attr('src',flb_image_name).animate({width:flb_new_width,height:flb_new_height,opacity:1},{duration:flb_settings.lightbox_flip_speed/2})},flb_settings.lightbox_flip_speed/2);flb_distance_from_top=flb_new_height+(flb_settings.lightbox_border_width*2)+25;flb_distance_from_top=($(window).height()-flb_distance_from_top)/2-(($('#flb-lightbox-text').height()/2)+20)+flb_placement;if(flb_distance_from_top<0){flb_distance_from_top=10}$("#flb-lightbox-content").prepend('<img id="flb-close" src="'+flb_blank_image+'" width="25px" height="25px" alt="Close" style="margin-top: '+flb_distance_from_top+'px; margin-left: '+flb_total_lightbox_width+'px;'+flb_box_sizing+'"/><br />');$("#flb-close").click(function(){$(document).unbind("keyup",flb_escape);$("#flb-close, #flb-next-pic, #flb-back-pic").unbind("click");$("#flb-close").attr('src',flb_blank_image);$("#flb-lightbox-image").attr('src',flb_image_name).animate({width:flb_image_innit_width,opacity:0},{duration:flb_settings.lightbox_flip_speed/2});setTimeout(function(){$("#flb-lightbox").fadeOut(500);if($("#flb-lightbox-text").is(':visible')){if(navigator.userAgent.match(/iPad/i)||flb_iphone_check()){$("#flb-lightbox-text").fadeOut()}else{$("#flb-lightbox-text").slideToggle()}}},flb_settings.lightbox_flip_speed/2)});window.setTimeout(function(){$("#flb-close").attr('src',flb_close_image);clearTimeout(flb_loading)},flb_settings.lightbox_flip_speed);if(flb_settings.lightbox_navigation_status==1&&flb_total_images>1){if(flb_lightbox_data[1]<flb_total_images){$("#flb-lightbox-text").prepend('<a href="next" id="flb-next-pic" style="'+flb_settings.next_and_back_image_text_style+''+flb_box_sizing+'">'+flb_settings.next_image_text+'</a>');$("#flb-next-pic").click(function(e){$(document).unbind("keyup",flb_escape);$("#flb-close, #flb-next-pic, #flb-back-pic").unbind("click");if($("#flb-lightbox-text").is(':visible')){if(navigator.userAgent.match(/iPad/i)||flb_iphone_check()){$("#flb-lightbox-text").fadeOut()}else{$("#flb-lightbox-text").slideToggle()}}e.preventDefault();setTimeout(function(){$('.'+flb_lightbox_data[0]+'-'+(Math.floor(flb_lightbox_data[1])+1)).trigger('click')},flb_settings.lightbox_flip_speed/2);$("#flb-close").attr('src',flb_blank_image);$("#flb-lightbox-image").attr('src',flb_image_name).animate({width:flb_image_innit_width,opacity:0},{duration:flb_settings.lightbox_flip_speed/2})})}$("#flb-lightbox-text").prepend('<span style="'+flb_settings.image_number_text_style+''+flb_box_sizing+'"> '+flb_settings.image_number_page+' '+flb_lightbox_data[1]+' '+flb_settings.image_number_of+' '+flb_total_images+' </span>');if(flb_lightbox_data[1]>1){$("#flb-lightbox-text").prepend('<a href="next" id="flb-back-pic" style="'+flb_settings.next_and_back_image_text_style+''+flb_box_sizing+'">'+flb_settings.back_image_text+'</a>');$("#flb-back-pic").click(function(e){$(document).unbind("keyup",flb_escape);$("#flb-close, #flb-next-pic, #flb-back-pic").unbind("click");if($("#flb-lightbox-text").is(':visible')){if(navigator.userAgent.match(/iPad/i)||flb_iphone_check()){$("#flb-lightbox-text").fadeOut()}else{$("#flb-lightbox-text").slideToggle()}}e.preventDefault();setTimeout(function(){$('.'+flb_lightbox_data[0]+'-'+(Math.floor(flb_lightbox_data[1])-1)).trigger('click')},flb_settings.lightbox_flip_speed/2);$("#flb-close").attr('src',flb_blank_image);$("#flb-lightbox-image").attr('src',flb_image_name).animate({width:flb_image_innit_width,opacity:0},{duration:flb_settings.lightbox_flip_speed/2})})}}function flb_escape(e){if(e.keyCode==27){$('#flb-close').trigger('click')}}$(document).keyup(flb_escape)},100)};flb_in_img.src=flb_image_name}).error(function(){$("#flb-load").html('');clearTimeout(flb_loading);setTimeout(function(){clearTimeout(flb_loading)},3000);$("#flb-lightbox").fadeOut(500);$("#flb-lightbox-content, #flb-lightbox-text").html('');$("#flb-lightbox-text").hide()})});$(window).resize(function(){flb_i=1;if($(window).height()<(flb_image_height+$('#flb-lightbox-text').height()+flb_h)+(flb_settings.lightbox_border_width*2)){flb_new_height=$(window).height()-(flb_settings.lightbox_border_width*2)-$('#flb-lightbox-text').height()-flb_h;flb_new_width=flb_image_width/flb_image_height*flb_new_height;flb_i=0}if($(window).width()<(flb_image_width+60)+(flb_settings.lightbox_border_width*2)&&($(window).width()-flb_image_width)<($(window).height()-flb_image_height-($('#flb-lightbox-text').height()+flb_h))){flb_new_width=$(window).width()-(flb_settings.lightbox_border_width*2)-60;flb_new_height=flb_image_height/flb_image_width*flb_new_width;flb_i=0}if(flb_i==1){flb_new_width=flb_image_width;flb_new_height=flb_image_height}if(flb_settings.lightbox_text_area_position=='top'&&flb_h==70){flb_placement=(($('#flb-lightbox-text').height()/2)+15)*2}else{flb_placement=0}$("#flb-lightbox-image").css({width:flb_new_width,height:flb_new_height});flb_distance_from_top=flb_new_height+(flb_settings.lightbox_border_width*2)+25;flb_distance_from_top=($(window).height()-flb_distance_from_top)/2-(($('#flb-lightbox-text').height()/2)+20)+flb_placement;if(flb_distance_from_top<0){flb_distance_from_top=10}$("#flb-close").css({'margin-top':flb_distance_from_top,'margin-left':($(window).width()-85)+(flb_settings.lightbox_border_width*2)+(($('#flb-lightbox-text').height()/2)+20)-flb_placement});flb_total_lightbox_width=(flb_new_width+25)+(flb_settings.lightbox_border_width*2);$("#flb-close").attr('style','margin-top: '+flb_distance_from_top+'px; margin-left: '+flb_total_lightbox_width+'px; '+flb_box_sizing+'');if(flb_settings.flip_mode==0){flb_image_innit_width=flb_new_width}else{flb_image_innit_width=0}})}

})( jQuery );
