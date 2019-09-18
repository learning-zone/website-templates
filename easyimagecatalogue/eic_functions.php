<?
/*
	Function createthumb($name,$filename,$new_w,$new_h)
	creates a resized image
	variables:
	$name		Original filename
	$filename	Filename of the resized image
	$new_w		width of resized image
	$new_h		height of resized image
*/	
function createthumb($name,$filename,$new_w,$new_h){
	$system=explode(".",$name);
	if (preg_match("/jpg|jpeg/i",$system[1])){$src_img=imagecreatefromjpeg($name);}
	if (preg_match("/png/i",$system[1])){$src_img=imagecreatefrompng($name);}
	$old_x=imageSX($src_img);
	$old_y=imageSY($src_img);
	if ($old_x > $old_y) {
		$thumb_w=$new_w;
		$thumb_h=$old_y*($new_h/$old_x);
	}
	if ($old_x < $old_y) {
		$thumb_w=$old_x*($new_w/$old_y);
		$thumb_h=$new_h;
	}
	if ($old_x == $old_y) {
		$thumb_w=$new_w;
		$thumb_h=$new_h;
	}
	$dst_img = @imageCreateTrueColor($thumb_w,$thumb_h);
	if (!$dst_img){
		$dst_img = imageCreate($thumb_w,$thumb_h); 
		imagecopyresized($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
	}else{
		imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
	}
	if (preg_match("/png/",$system[1])){
		imagepng($dst_img,$filename); 
	} else {
		imagejpeg($dst_img,$filename); 
	}
	imagedestroy($dst_img); 
	imagedestroy($src_img); 
}

/*
        function ditchtn($arr)
        filters out thumbnails
*/
function ditchtn($arr){
	foreach ($arr as $item){
		if (!preg_match("/^tn_|preview\.jpg/",$item)){$tmparr[]=$item;}
	}
	return $tmparr;
}

/*
        Function load($file)
        reads the content of the file that you send and returns it
*/
function load($filelocation){
        if (file_exists($filelocation)){
                $newfile = fopen($filelocation,"r");
                $file_content = fread($newfile, filesize($filelocation));
                fclose($newfile);
                return $file_content;
                }
        }

/*
        Function save($file,$content)
        writes the content to the file and generates it if needed
*/
function save($filelocation,$newdatas){
        $newfile = fopen($filelocation,"w+");
        fwrite($newfile, $newdatas);
        fclose($newfile);
        }

/*
        Function reverse($array)
        reverses an array
*/
function reverse($srcarray){
        $backarray=array();
        for ($i=sizeof($srcarray);$i>0;$i--){
                $backarray[] = $srcarray[$i];
                }
        return $backarray;
        }

/*
        Function namefiler($array,$filter)
        filters out all the items that apply to filter and returns the cleaned array
*/
function namefilter($array,$filter){
        $temparray=array();
        $searchsize=strlen($filter);
                for ($r=0;$r<sizeof($array);$r++){
                        if (substr($array[$r],0,$searchsize) != $filter){$temparray[]=$array[$r];}
                }
        return $temparray;
        }

/*
        Function directory($directory,$filters)
        reads the content of $directory, takes the files that apply to $filter and returns an
        array of the filenames.
        You can specify which files to read, for example
        $files = directory(".","jpg,gif");
                gets all jpg and gif files in this directory.
        $files = directory(".","all");
                gets all files.
*/
function directory($dir,$filters){
        $handle=opendir($dir);
        $files=array();
        if ($filters == "all"){while(($file = readdir($handle))!==false){$files[] = $file;}}
        if ($filters != "all"){
                $filters=explode(",",$filters);
                while (($file = readdir($handle))!==false) {
                        for ($f=0;$f<sizeof($filters);$f++):
                                $system=explode(".",$file);
                                if ($system[1] == $filters[$f]){$files[] = $file;}
                        endfor;
                }
        }
        closedir($handle);
        return $files;
        }


/*
        Function untag($string,$tag,mode){
        written by Chris Heilmann (info@onlinetools.org)
        filters the content of tag $tag from $string
        when mode is 1 the content gets returned as an array
        otherwise as a string
*/
function untag($string,$tag,$mode){
        $tmpval="";
        $preg="/<".$tag.">(.*?)<\/".$tag.">/si";
        preg_match_all($preg,$string,$tags);
        foreach ($tags[1] as $tmpcont){
                if ($mode==1){$tmpval[]=$tmpcont;}
                else {$tmpval.=$tmpcont;}
                }
        return $tmpval;
}
?>