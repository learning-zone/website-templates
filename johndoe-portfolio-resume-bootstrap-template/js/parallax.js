    /* ==============================================
    Parallax
    =============================================== */ 
    ( function( $ ) {
      // Setup variables
      $window = $(window);
      $slide = $('.homeSlide');
      $body = $('body');
      
        //FadeIn all sections   
      $body.imagesLoaded( function() {
        setTimeout(function() {
              
              // Resize sections
              adjustWindow();
              
              // Fade in sections
            $body.removeClass('loading').addClass('loaded');
            
        }, 800);
      });
      
      function adjustWindow(){
        
        // Init Skrollr
        var s = skrollr.init({
            forceHeight: false
        });
        
        // Get window size
          winH = $window.height();
          
          // Keep minimum height 550
          if(winH <= 450) {
          winH = 450;
        } 
          
          // Resize our slides
          $slide.height(winH);
          
          // Refresh Skrollr after resizing our sections
          s.refresh($('.homeSlide'));
          
      }} )
    ( jQuery );