$(function(){

	$(".html").chili();
	$(".css").chili();
	$(".js").chili();

	$('.accordion').accordion({
		autoHeight  : false,
		collapsible : true,
		active      : false // start compressed
	});

	$('#slider1')
	.anythingSlider({
		toggleControls : true,
		theme          : 'metallic',
		navigationFormatter : function(i, panel){
			return '<img src="demos/images/th-slide-' + ['civil-1', 'env-1', 'civil-2', 'env-2'][i-1] + '.jpg">';
		}
	})
	.find('.panel:not(.cloned) img') // ignore the cloned panels
		.attr('rel','group')           // add all slider images to a colorbox group
		.colorbox({
			width  : '90%',
			height : '90%',
			href   : function(){ return $(this).attr('src'); },
			title  : function(){ return $(this).attr('title') },
			rel    : 'group'
		});

	$('#slider2')
	.anythingSlider({
		resizeContents      : false,
		navigationFormatter : function(i, panel){
			return ['Recipe', 'Quote', 'Image', 'Quote #2', 'Image #2', 'Test'][i - 1];
		}
	})
	.anythingSliderFx({
		// base FX definitions
		// '.selector' : [ 'effect(s)', 'distance/size', 'time', 'easing' ] - 'time' and 'easing' are optional parameters
		'.quoteSlide:first > *' : [ 'grow', '24px', '400', 'easeInOutCirc' ],
		'.quoteSlide:last'      : [ 'top', '500px', '400', 'easeOutElastic' ],
		'.expand'               : [ 'expand', '10%', '400', 'easeOutBounce' ],
		'.textSlide h3'         : [ 'top left', '200px', '500', 'easeOutCirc' ],
		'.textSlide img,.fade'  : [ 'fade' ],
		'.textSlide li'         : [ 'listLR' ]
		/*
		// for more precise control, use the "in" and "out" definitions
		// in = the animation that occurs when you slide "in" to a panel
		,inFx  : {
			'.textSlide h3'  : { opacity: 1, top  : 0, duration: 400, easing : 'easeOutBounce' },
			'.textSlide li'  : { opacity: 1, left : 0, duration: 400 },
			'.textSlide img' : { opacity: 1, duration: 400 },
			'.quoteSlide'    : { top : 0, duration: 400, easing : 'easeOutElastic' },
			'.expand'        : { width: '100%', top: '0%', left: '0%', duration: 400, easing : 'easeOutBounce' }
		},
		// out = the animation that occurs when you slide "out" of a panel
		// (it also occurs before the "in" animation) - outFx animation time is 1/2 of inFx time
		outFx : {
			'.textSlide h3'      : { opacity: 0, top  : '-100px', duration: 200 },
			'.textSlide li:odd'  : { opacity: 0, left : '-200px', duration: 200 },
			'.textSlide li:even' : { opacity: 0, left : '200px',  duration: 200 },
			'.textSlide img'     : { opacity: 0, duration: 200 },
			'.quoteSlide:first'  : { top : '-500px', duration: 200 },
			'.quoteSlide:last'   : { top : '500px', duration: 200 },
			'.expand'            : { width: '10%', top: '50%', left: '50%', duration: 200 },
		}
		*/
	});

	$('#slider3')
	.anythingSlider({
		navigationFormatter : function(i, panel){
			return ['Top', 'Right', 'Bottom', 'Left'][i - 1];
		}
	})
	.anythingSliderFx({
		'.caption-top'    : [ 'caption-Top', '50px' ],
		'.caption-right'  : [ 'caption-Right', '130px', '1000', 'easeOutBounce' ],
		'.caption-bottom' : [ 'caption-Bottom', '50px' ],
		'.caption-left'   : [ 'caption-Left', '130px', '1000', 'easeOutBounce' ]
	})
	/* use this code to have the caption slide in and out from the bottom with each panel
	.anythingSliderFx({
		inFx: {
			'.caption-top'    : { top: 0, opacity: 0.8, duration: 400 },
			'.caption-right'  : { right: 0, opacity: 0.8, duration: 1000, easing: 'easeOutBounce' },
			'.caption-bottom' : { bottom: 0, opacity: 0.8, duration: 400 },
			'.caption-left'   : { left: 0, opacity: 0.8, duration: 1000, easing: 'easeOutBounce' }
		},
		outFx: {
			'.caption-top'    : { top: -50, opacity: 0, duration: 200 },
			'.caption-right'  : { right: -150, opacity: 0, duration: 500, easing: 'easeOutBounce' },
			'.caption-bottom' : { bottom: -50, opacity: 0, duration: 200 },
			'.caption-left'   : { left: -150, opacity: 0, duration: 500, easing: 'easeOutBounce' }
		}
	})
	*/
	// add a close button (x) to the caption
	.find('div[class*=caption]')
		.prepend('<span class="close">x</span>')
		.find('.close').click(function(){
			var cap = $(this).parent(),
				ani = { bottom : -50 }; // bottom
			if (cap.is('.caption-top')) { ani = { top: -50 }; }
			if (cap.is('.caption-left')) { ani = { left: -150 }; }
			if (cap.is('.caption-right')) { ani = { right: -150 }; }
			cap.animate(ani, 400);
		});

	/* use this code if you only want the caption to appear when you hover over the panel
	.find('.panel')
		.find('div[class*=caption]').css({ position: 'absolute' }).end()
		.hover(function(){ showCaptions( $(this) ) }, function(){ hideCaptions( $(this) ); });

	showCaptions = function(el){
		var $this = el;
		if ($this.find('.caption-top').length) { $this.find('.caption-top').show().animate({ top: 0, opacity: 1 }, 400); }
		if ($this.find('.caption-right').length) { $this.find('.caption-right').show().animate({ right: 0, opacity: 1 }, 400); }
		if ($this.find('.caption-bottom').length) { $this.find('.caption-bottom').show().animate({ bottom: 0, opacity: 1 }, 400); }
		if ($this.find('.caption-left').length) { $this.find('.caption-left').show().animate({ left: 0, opacity: 1 }, 400); }
	};
	hideCaptions = function(el){
		var $this = el;
		if ($this.find('.caption-top').length) { $this.find('.caption-top').stop().animate({ top: -50, opacity: 0 }, 400); }
		if ($this.find('.caption-right').length) { $this.find('.caption-right').stop().animate({ right: -150, opacity: 0 }, 400); }
		if ($this.find('.caption-bottom').length) { $this.find('.caption-bottom').stop().animate({ bottom: -50, opacity: 0 }, 400); }
		if ($this.find('.caption-left').length) { $this.find('.caption-left').stop().animate({ left: -150, opacity: 0 }, 400); }
	};

	// hide all captions initially
	hideCaptions( $('#slider3 .panel') );
*/

});
