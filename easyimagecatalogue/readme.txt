 Easy Image Catalogue
--------------------------------------------------------------------------------
Thank you for downloading EasyImageCatalogue. When you encounter any problems 
please refer to the homepage of this tool:

http://www.onlinetools.org/tools/easyimagecatalogue.php

1) What is EasyImageCatalogue (EIC)?

EIC is an image catalgue system. It lists all the galleries in the folder, 
allows the owner to generate the thumbnails and descriptions for each image in 
the gallery, tracks how often a gallery was clicked and allows users to search
for images in all galleries.
Galleries are added by creating new folders and uploading the images in these 
folders. After describing the images and generating the thumbnails the gallery
is immediately visible on the main page.
EIC displays the galleries as thumbnails. Clicking on a thumbnail will take the 
user to the image display page. This page shows the big image with links to the 
next and previous image. Users can also add comments to each image.

2) What do I need to run EIC?

A server with PHP, and the correct attribute settings of the folders. The folder
counterdata and all the gallery folders need to be set to 777 (read/write/execute
all) to allow EIC to store data and thumbnails.
EIC does NOT need a database.
For thumbnail generation, the PHP should be compiled with gd_lib. Recommended is
gd2 for better quality, but EIC works with older gd_libs as well. EIC does only 
support JPG and PNG images.

3) How do I install EIC?

Step 1: Unzip EIC to an own folder on the server (or the root folder, if the 
gallery is all you want to have on the server).
Step 2: Set the file permissions for the counterdata folder to 777.

4) How do I add my galleries?

Step 1: Generate a new folder for each gallery, the folder name will be the name
of the gallery, unless you define another name in its description. 
Step 2: Set the file permissions for these folders to 777.
Step 3: Upload your images to these folders.
Step 4: call "thumber.php". This script shows you a list of all the available 
galleries. Clicking on a gallery name will generate the thumbnails. This can 
take some time, depending how fast the computer is. The thumbnail size is fixed
to a hundred pixels either in width or height. Once the thumbnails are generated,
all of them get displayed. Click on the thumbnail that you want to become the 
preview image of the gallery.
Step 5: call "describe.php". This script shows you all the thumbnails with a 
textarea to add a description for each image. On top you can define the name
of the gallery, and the description of the gallery. Click the describe button to
store the data.

Once the thumbnails of a gallery are generated and the description is added, it
will be available on the main page.

5) How do I change the look and feel of EIC?

EIC is template driven. All the files (name)_template.html can be modified by 
you. All the functionality in these files is achieved through HTML comments. 
These comments are described in each of these files.
thumber_template.html is the look and feel of the thumbnail generation script.
easyimagecatalogue_template.html is the main page
describe_template.html is the form to describe the gallery
comments_template.html is the comment display look and feel
addcomment_template.html is the comment entry form

It is not allowed to change ANY of the PHP scripts in this free version. If you 
try that, EIC might not work anymore.

6) Mandatory security precautions

RENAME thumber.php and describe.php before you use EIC! Otherwise people will be 
able to rename the galleries and descriptions and generate thumbnails on your 
server and skyrocket your traffic!

7) How much does EIC cost?

EIC has to be used on private, non profit sites. With a visible branding, a 
small link that EIC adds automatically, it is free to use. 

It is NOT allowed to make any changes to the PHP code, and it is not open source
for you to tweak and redistribute.
(I am sorry about this, but I had too many bad experiences with people changing
my code and users blaming me for errors that were caused by these changes.)

8) Is it possible to have an unbranded version and use it on a professional site?

Yes. You can purchase a professional version for 50 dollars/euros. This version
will have no branding.
Orders can be paid online with credit card via paypal or via cheque. Please 
contact me for further details.

