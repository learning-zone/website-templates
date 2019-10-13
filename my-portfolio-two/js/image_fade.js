$(document).ready(function() {    
  
  // execute the slideShow, set 4 seconds (4000) for each image
  slideShow(4000);

});

function slideShow(speed) {

  // append an 'li' item to the 'ul' list for displaying the caption
  $('ul.images').append('<li id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><p></p></div></li>');

  // set the opacity of all images to 0
  $('ul.images li').css({opacity: 0.0});
  
  // get the first image and display it
  $('ul.images li:first').css({opacity: 1.0}).addClass('show');
  
  // call the gallery function to run the slideshow  
  var timer = setInterval('gallery()',speed);
  
  // pause the slideshow on mouse over
  $('ul.images').hover(
    function () {
      clearInterval(timer); 
    },  
    function () {
      timer = setInterval('gallery()',speed);     
    }
  );  
}

function gallery() {

  //if no images have the show class, grab the first image
  var current = ($('ul.images li.show')?  $('ul.images li.show') : $('#ul.images li:first'));

  // trying to avoid speed issue
  if(current.queue('fx').length == 0) {

    // get the next image, if it reached the end of the slideshow, rotate it back to the first image
    var next = ((current.next().length) ? ((current.next().attr('id') == 'slideshow-caption')? $('ul.images li:first') :current.next()) : $('ul.images li:first'));
      
    // get the next image caption
    var desc = next.find('img').attr('alt');  
  
    // set the fade in effect for the next image, show class has higher z-index
    next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);
    
    // hide the current image
    current.animate({opacity: 0.0}, 1000).removeClass('show');

  }
}