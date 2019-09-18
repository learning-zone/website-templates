/*!
 * jQuery wmuSlider v2.1
 * 
 * Copyright (c) 2011 Brice Lechatellier
 * http://brice.lechatellier.com/
 *
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {
    
    $.fn.wmuSlider = function(options) {

        /* Default Options
        ================================================== */       
        var defaults = {
            animation: 'fade',
            animationDuration: 600,
            slideshow: true,
            slideshowSpeed: 7000,
            slideToStart: 0,
            navigationControl: true,
            paginationControl: true,
            previousText: 'Previous',
            nextText: 'Next',
            touch: false,
            slide: 'article',
            items: 1
        };
        var options = $.extend(defaults, options);
        
        return this.each(function() {

            /* Variables
            ================================================== */
            var $this = $(this);
            var currentIndex = options.slideToStart;
            var wrapper = $this.find('.wmuSliderWrapper');
            var slides = $this.find(options.slide);
            var slidesCount = slides.length;
            var slideshowTimeout;
            var paginationControl;
            var isAnimating;
            
            
            /* Load Slide
            ================================================== */ 
            var loadSlide = function(index, infinite, touch) {
                if (isAnimating) {
                    return false;
                }
                isAnimating = true;
                currentIndex = index;
                var slide = $(slides[index]);
                $this.animate({ height: slide.innerHeight() });
                if (options.animation == 'fade') {
                    slides.css({
                        position: 'absolute',
                        opacity: 0
                    });
                    slide.css('position', 'relative');
                    slide.animate({ opacity:1 }, options.animationDuration, function() {
                        isAnimating = false;
                    });
                } else if (options.animation == 'slide') {
                    if (!infinite) {
                        wrapper.animate({ marginLeft: -$this.width() / options.items * index }, options.animationDuration, function() {
                            isAnimating = false;
                        });
                    } else {
                        if (index == 0) {
                            wrapper.animate({ marginLeft: -$this.width() / options.items * slidesCount }, options.animationDuration, function() {
                                wrapper.css('marginLeft', 0);
                                isAnimating = false;
                            });
                        } else {
                            if (!touch) {
                                wrapper.css('marginLeft', -$this.width() / options.items * slidesCount);
                            }
                            wrapper.animate({ marginLeft: -$this.width() / options.items * index }, options.animationDuration, function() {
                                isAnimating = false;
                            });
                        }
                    }
                }

                if (paginationControl) {
                    paginationControl.find('a').each(function(i) {
                        if(i == index) {
                            $(this).addClass('wmuActive');
                        } else {
                            $(this).removeClass('wmuActive');
                        }
                    });
                }    
                                                    
                // Trigger Event
                $this.trigger('slideLoaded', index);             
            };
            
            
            /* Navigation Control
            ================================================== */ 
            if (options.navigationControl) {
                var prev = $('<a class="wmuSliderPrev">' + options.previousText + '</a>');
                prev.click(function(e) {
                    e.preventDefault();
                    clearTimeout(slideshowTimeout);
                    if (currentIndex == 0) {
                        loadSlide(slidesCount - 1, true);
                    } else {
                        loadSlide(currentIndex - 1);
                    }
                });
                $this.append(prev);
                
                var next = $('<a class="wmuSliderNext">' + options.nextText + '</a>');
                next.click(function(e) {
                    e.preventDefault();
                    clearTimeout(slideshowTimeout);
                    if (currentIndex + 1 == slidesCount) {    
                        loadSlide(0, true);
                    } else {
                        loadSlide(currentIndex + 1);
                    }
                });                
                $this.append(next);
            }
            

            /* Pagination Control
            ================================================== */ 
           /*-- if (options.paginationControl) {
                paginationControl = $('<ul class="wmuSliderPagination"></ul>');
                $.each(slides, function(i) {
                    paginationControl.append('<li><a href="#">' + i + '</a></li>');
                    paginationControl.find('a:eq(' + i + ')').click(function(e) {    
                        e.preventDefault();
                        clearTimeout(slideshowTimeout);   
                        loadSlide(i);
                    });                
                });
                $this.append(paginationControl);
            }
            
            
            /* Slideshow
            ================================================== */ 
            if (options.slideshow) {
                var slideshow = function() {
                    if (currentIndex + 1 < slidesCount) {
                        loadSlide(currentIndex + 1);
                    } else {
                        loadSlide(0, true);
                    }
                    slideshowTimeout = setTimeout(slideshow, options.slideshowSpeed);
                }
                slideshowTimeout = setTimeout(slideshow, options.slideshowSpeed);
            }
            
                        
            /* Resize Slider
            ================================================== */ 
            var resize = function() {
                var slide = $(slides[currentIndex]);
                $this.animate({ height: slide.innerHeight() });
                if (options.animation == 'slide') {
                    slides.css({
                        width: $this.width() / options.items
                    });
                    wrapper.css({
                        marginLeft: -$this.width() / options.items * currentIndex,
                        width: $this.width() * slides.length
                    });                    
                }    
            };
            
                        
            /* Touch
            ================================================== */
            var touchSwipe = function(event, phase, direction, distance) {
                clearTimeout(slideshowTimeout);              
                if(phase == 'move' && (direction == 'left' || direction == 'right')) {
                    if (direction == 'right') {
                        if (currentIndex == 0) {
                            wrapper.css('marginLeft', (-slidesCount * $this.width() / options.items) + distance);
                        } else {
                            wrapper.css('marginLeft', (-currentIndex * $this.width() / options.items) + distance);
                        }
                    } else if (direction == 'left') {
                        wrapper.css('marginLeft', (-currentIndex * $this.width() / options.items) - distance);
                    }
                } else if (phase == 'cancel' ) {
                    if (direction == 'right' && currentIndex == 0) {
                        wrapper.animate({ marginLeft: -slidesCount * $this.width() / options.items }, options.animationDuration);                
                    } else {
                        wrapper.animate({ marginLeft: -currentIndex * $this.width() / options.items }, options.animationDuration);  
                    }
                } else if (phase == 'end' ) {
                    if (direction == 'right') {
                        if (currentIndex == 0) {
                            loadSlide(slidesCount - 1, true, true);
                        } else {
                            loadSlide(currentIndex - 1);
                        }
                    } else if (direction == 'left')    {        
                        if (currentIndex + 1 == slidesCount) {
                            loadSlide(0, true);
                        } else {
                            loadSlide(currentIndex + 1);
                        }
                    } else {
                        wrapper.animate({ marginLeft: -currentIndex * $this.width() / options.items }, options.animationDuration);
                    }
                }            
            };
            if (options.touch && options.animation == 'slide') {
                if (!$.isFunction($.fn.swipe)) {
                    $.ajax({
                        url: 'jquery.touchSwipe.min.js',
                        async: false
                    });
                }
                if ($.isFunction($.fn.swipe)) {
                    $this.swipe({ triggerOnTouchEnd:false, swipeStatus:touchSwipe, allowPageScroll:'vertical' });
                }
            }
            
            
            /* Init Slider
            ================================================== */ 
            var init = function() {
                var slide = $(slides[currentIndex]);
                var img = slide.find('img');
                img.load(function() {
                    wrapper.show();
                    $this.animate({ height: slide.innerHeight() });
                });
                if (options.animation == 'fade') {
                    slides.css({
                        position: 'absolute',
                        width: '100%',
                        opacity: 0
                    });
                    $(slides[currentIndex]).css('position', 'relative');
                } else if (options.animation == 'slide') {
                    if (options.items > slidesCount) {
                        options.items = slidesCount;
                    }
                    slides.css('float', 'left');                    
                    slides.each(function(i){
                        var slide = $(this);
                        slide.attr('data-index', i);
                    });
                    for(var i = 0; i < options.items; i++) {
                        wrapper.append($(slides[i]).clone());
                    }
                    slides = $this.find(options.slide);
                }
                resize();
                
                $this.trigger('hasLoaded');
                
                loadSlide(currentIndex);
            }
            init();
            
                                                
            /* Bind Events
            ================================================== */
            // Resize
            $(window).resize(resize);
            
            // Load Slide
            $this.bind('loadSlide', function(e, i) {
                clearTimeout(slideshowTimeout);
                loadSlide(i);
            });
                        
        });
    }
    
})(jQuery);