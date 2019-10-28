
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Countdown initializer
	*/
	var now = new Date();
	var countTo = 278 * 24 * 60 * 60 * 1000 + now.valueOf();    
	$('.timer').countdown(countTo, function(event) {
		$(this).find('.days').text(event.offset.totalDays);
		$(this).find('.hours').text(event.offset.hours);
		$(this).find('.minutes').text(event.offset.minutes);
		$(this).find('.seconds').text(event.offset.seconds);
	});
	
	/*
	    Subscription form
	*/
	$('.success-message').hide();
	$('.error-message').hide();
	
	$('.subscribe form').submit(function(e) {
		e.preventDefault();
	    var postdata = $('.subscribe form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/subscribe.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.valid == 0) {
	                $('.success-message').hide();
	                $('.error-message').hide();
	                $('.error-message').html(json.message);
	                $('.error-message').fadeIn();
	            }
	            else {
	                $('.error-message').hide();
	                $('.success-message').hide();
	                $('.subscribe form').hide();
	                $('.success-message').html(json.message);
	                $('.success-message').fadeIn();
	            }
	        }
	    });
	});
    
});

