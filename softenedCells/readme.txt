===============================================================
TEMPLATE: Softened Cells
  AUTHOR: Pat Heard { fullahead.org }
    DATE: 2005.08.26
     USE: Free use, but credits are appreciated
===============================================================



===============================================================
README?
===============================================================

The idea behind it is to help get you going with the 
template.  Normally I would just put this kind of stuff
in the template as HTML comments, but IE can't handle comments
around floated content, so that's out.   

This template is designed to be coded using as much standard
HTML markup as possible.  This means it's easy to code for you
and it will display consistently.




===============================================================
USE
===============================================================

MAIN LAYOUT
---------------------------------------------------------------

#header:     Put your site's title/sub-title here.  Your 
             title and/or sub-title can be a link if you want.


#menu:       This is for the top, tabbed menu.  Use the 
             "active" class to show which page the user is on.


#news:       The smaller of the 2 columns.  You can define as
             many <div class="block"> as you would like, but
             asthetically, the site looks better when the #news
             column is shorter than the #text column.

#text:       The main, content column.  All your content can
             be placed in standard tags:

               <h1>, <h2>, <p>, <ul>, etc.
               
#footer:     Holds your copyright info, last updated scripts
             and whatever else you might want to stick at the
             bottom.


FANCY EXTRAS
---------------------------------------------------------------

.block:      This is used in the #news column to create the 
             rounded grey blocks.  You can have as many or as
             few as you would like.  They must be coded like 
             so:

               <div class="block">
                 <h1>Block Title</h1>
                 <p>Block content - better than a poke in the eye</p>
 
                 <div class="bottom">&nbsp;</div>
               </div>         


.links:      The .links class has two uses.  In the #news .block
             context, it will create a side navigation menu.  
             In the #text column applied to a <ul> element it
             will create a list of large, clickable links.   
             

.quote:      Creates the highlighted quote block used in the
             #text column.  It must be coded like so:

               <p class="quote">
                 This is my quote text...goodness...thrilling.
                 <span class="bottom">&nbsp;</span>
               </p>
             



===============================================================
CONTACT
===============================================================

If you're having trouble with the template, or notice a bug,
let me know:

http://fullahead.org/contact.html (pat.heard@gmail.com)