$(function(){
	/* css3 demo page */
	// animate.css list as of 12/2011
	var animationList = [
		// Attention seekers
		'flash', 'bounce', 'shake', 'tada', 'swing', 'wobble', 'pulse',
		// Flippers (currently Webkit, Firefox Nightlies, &amp; IE10 only)
		'flip', 'flipInX', 'flipOutX', 'flipInY', 'flipOutY',
		// Fading entrances
		'fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig', 'fadeInLeftBig', 'fadeInRightBig',
		// Fading exits
		'fadeOut', 'fadeOutUp', 'fadeOutDown', 'fadeOutLeft', 'fadeOutRight', 'fadeOutUpBig', 'fadeOutDownBig', 'fadeOutLeftBig', 'fadeOutRightBig',
		// Bouncing entrances
		'bounceIn', 'bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight',
		// Bouncing exits
		'bounceOut', 'bounceOutDown', 'bounceOutUp', 'bounceOutLeft', 'bounceOutRight',
		// Rotating entrances
		'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight',
		// Rotating exits
		'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
		// Specials
		'hinge', 'rollIn', 'rollOut'
	], s = '', i, sel;
	for (i=0; i<animationList.length; i++){
		s += '<option>' + animationList[i] + '</option>';
	}
	sel = $('.animations')
		.append(s)
		.change(function(){
			s = sel.eq(0).val() + ', ' + sel.eq(1).val();
			$('#slider li:not(.cloned):first').removeClass(animationList.join(' ')).attr('data-animate', s);
		});
	sel
		.eq(0).val('rotateInDownLeft').end()
		.eq(1).val('rotateOutDownRight');

		$('button').click(function(){
			$('#slider').anythingSlider(1);
		});


});