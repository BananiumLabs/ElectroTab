<?php

/* getWebSnapshot: */

/**
 * API to retrieve website icon from multiple failsafe
 *
 *
 * PHP version 5
 *
 * LICENSE: This source file is subject to version 3.0 of the PHP license
 * If you did not receive a copy of the PHP License and are unable to
 * obtain it through the web, please send a note to contact@enumc.com so
 * we can mail you a copy immediately.
 *
 * @category   Utility
 * @package    ElectroTabAPI
 * @author     Eric Qian <eric@enumc.com>
 * @copyright  2017 Eric Qian
 * @license    https://raw.githubusercontent.com/dbqeo/ElectroTab/master/LICENSE  GPL License 3.0
 * @version    SVN: $Id$
 * @link       https://enumc.com
 */
require('/app/vendor/autoload.php');
use GDText\Box;
use GDText\Color;

$origLink = 'undef';
$finalLink = 'undef';

// CONSTANTS - CHANGE THESE TO ALTER API
$ENABLE_BESTICON = true;
// END OF CONSTANTS

if (isset($_GET['link'])) {

        $origLink = $_GET['link'];
        //echo $origLink;

    }else{
        // Fallback behaviour goes here
        echo "\r\nERROR: No URL Defined";
        echo "<br><br><br>Made By: Eric Q. <br>Email contact@enumc.com to report any issues.";
        die;
    }

function get_http_response_code($link) {
  $headers = get_headers($link);
  return substr($headers[0], 9, 3);
}
function debug_to_console($data) {
    file_put_contents("php://stderr", $data);
}
/**
 * get_redirect_url()
 * Gets the address that the provided URL redirects to,
 * or FALSE if there's no redirect.
 *
 * @param string $url
 * @return string
 */
function get_redirect_url($url){
    $redirect_url = null;

    $url_parts = @parse_url($url);
    if (!$url_parts) return false;
    if (!isset($url_parts['host'])) return false; //can't process relative URLs
    if (!isset($url_parts['path'])) $url_parts['path'] = '/';

    $sock = fsockopen($url_parts['host'], (isset($url_parts['port']) ? (int)$url_parts['port'] : 80), $errno, $errstr, 30);
    if (!$sock) return false;

    $request = "HEAD " . $url_parts['path'] . (isset($url_parts['query']) ? '?'.$url_parts['query'] : '') . " HTTP/1.1\r\n";
    $request .= 'Host: ' . $url_parts['host'] . "\r\n";
    $request .= "Connection: Close\r\n\r\n";
    fwrite($sock, $request);
    $response = '';
    while(!feof($sock)) $response .= fread($sock, 8192);
    fclose($sock);

    if (preg_match('/^Location: (.+?)$/m', $response, $matches)){
        if ( substr($matches[1], 0, 1) == "/" )
            return $url_parts['scheme'] . "://" . $url_parts['host'] . trim($matches[1]);
        else
            return trim($matches[1]);

    } else {
        return false;
    }

}

/**
 * get_all_redirects()
 * Follows and collects all redirects, in order, for the given URL.
 *
 * @param string $url
 * @return array
 */
function get_all_redirects($url){
    $redirects = array();
    while ($newurl = get_redirect_url($url)){
        if (in_array($newurl, $redirects)){
            break;
        }
        $redirects[] = $newurl;
        $url = $newurl;
    }
    return $redirects;
}

/**
 * get_final_url()
 * Gets the address that the URL ultimately leads to.
 * Returns $url itself if it isn't a redirect.
 *
 * @param string $url
 * @return string
 */
function get_final_url($url){
    $redirects = get_all_redirects($url);
    if (count($redirects)>0){
        return array_pop($redirects);
    } else {
        return $url;
    }
}

function displayURL($url) {
  $handle=fopen($url,"rb");
  // initialize
  $lines_string="";
  // read content line by line
  do{
  	$data=fread($handle,1024);
  	if(strlen($data)==0) {
  		break;
  	}
  	$lines_string.=$data;
  }while(true);
  //close handle to release resources
  fclose($handle);
  //output, you can also save it locally on the server
  echo $lines_string;
}

function thumbnailws() {
  $thumbnailws = "https://api.thumbnail.ws/api/ab88b8821adee068d097104644bb97e800ffc71a02a3/thumbnail/get?url=";
  if(substr( $_GET['link'], 0, 4 ) === "http") {
    $thumbnailws .= $_GET['link'];
  }
  else {
    $thumbnailws .= "http://";
    $thumbnailws .= $_GET['link'];
  }

  //echo "Current: ";
  //echo $_GET['link'];
  $thumbnailws .= "&width=256";
  return $thumbnailws;
}

function clearbit() {
  $clearbit = "https://logo.clearbit.com/";
  $clearbit .= $_GET['link'];
  $clearbit .= "?size=256";
  return get_final_url($clearbit);
}

function pageToImages() {
  $p2i = "https://api.page2images.com/directlink?p2i_url=";
  $p2i .= "http://";
  $p2i .= preg_replace('#^https?://#', '', $_GET['link']);
  $p2i .= "&p2i_key=e44ef28bd592f8a5&p2i_size=256x256";
  return $p2i;
}

function bestIcon() {
  $bestIco = "https://icons.better-idea.org/icon?url=";
  $bestIco .= preg_replace('#^https?://#', '', $_GET['link']);
  $bestIco .= "&size=128..256..500";
  return get_final_url($bestIco);
}

function getTextFactor($font, $text, $size, $angle, $width, $height)
{
    //if the size are zero don't execute any further, it's not necessary
    if($width == 0 || $height == 0) throw new ArgumentException("$width or $height could not be zero!");

    //get the text size
    $box = imagettfbbox($size, $angle, $font, $text);

    $minX = min(array($box[0],$box[2],$box[4],$box[6]));
    $maxX = max(array($box[0],$box[2],$box[4],$box[6]));

    $minY = min(array($box[1],$box[3],$box[5],$box[7]));
    $maxY = max(array($box[1],$box[3],$box[5],$box[7]));

    $factorX = 1;
    if($tmpWdith = ($maxX - $minX) > $width)
    {
        $factorX = $tmpWidth / $width;
    }

    $factorY = 1;
    if($tmpHeight = ($maxY - $minY) > $height)
    {
        $factorY = $tmpHeight / $height;
    }

    return min(array($factorX, $factorY));
}

function displayError($text) {
/*
  $width = 256;
  $height = 20;
  $fontsize = 5;

  $img = imagecreate($width, $height);

  // Transparent background
  $black = imagecolorallocate($img, 0, 0, 0);
  imagecolortransparent($img, $black);

  // Red text
  $red = imagecolorallocate($img, 255, 0, 0);
  imagestring($img, $fontsize, 0, 0, $text, $red);

  header('Content-type: image/png');
  imagepng($img);
  imagedestroy($img);*/

  $im = imagecreatetruecolor(256, 256);
  $backgroundColor = imagecolorallocate($im, 153, 0, 0);
  imagefill($im, 0, 0, $backgroundColor);

  $box = new Box($im);
  $box->setFontFace('Franchise-Bold-hinted.ttf'); // http://www.dafont.com/franchise.font
  $box->setFontSize(80);
  $box->setFontColor(new Color(255, 255, 255));
  $box->setTextShadow(new Color(0, 0, 0, 50), 0, -2);
  $box->setBox(0, 0, 256, 256);
  $box->setTextAlign('center', 'center');
  $box->draw($text);

  header("Content-type: image/png");
  imagepng($im);
  imagedestroy($im);
}

function tryDisplay($checkLink, $provider) {
  $get_http_response_code = get_http_response_code($checkLink);

  if($provider == "page2img") {
    list($width, $height) = getimagesize($checkLink);
  }
  if($provider == "page2img" && $width == 160 && $height == 160) {
    return false;
  }
  if ($provider == "bestIcon" && $get_http_response_code == 400) {
    return false;
  }
  if ($provider == "bestIcon" $$ !$ENABLE_BESTICON) {
    return false;
  }
  if ($get_http_response_code == 200) {
    //echo "WORKING";
    header('Content-Type: image/png');
    displayURL($checkLink);
    return true;
  } else {
    //echo $get_http_response_code;
    //echo "Nope";
    //echo $checkLink;
    return false;
  }
}

function ping($host, $port, $timeout) {
      $tB = microtime(true);
      $fP = fSockOpen($host, $port, $errno, $errstr, $timeout);
      if (!$fP) { return "down"; }
      $tA = microtime(true);
      return round((($tA - $tB) * 1000), 0)." ms";
}

function checkURLValid() {
  if(substr( $_GET['link'], 0, 4 ) === "http") {
    $curLink = $_GET['link'];
  }
  else {
    $curLink = "http://";
    $curLink .= $_GET['link'];
  }

  $curLink = get_final_url($curLink);
  $get_http_response_code = get_http_response_code($curLink);
  if ( $get_http_response_code != 200 && $get_http_response_code != 301 && $get_http_response_code != 302 && $get_http_response_code != 403) {
    debug_to_console("\n");
    debug_to_console($curLink);
    debug_to_console("\nURL ERROR: ");
    debug_to_console($get_http_response_code);
    debug_to_console("\n\n");
    $errorMsg = "URL INVALID";
    displayError($errorMsg);
    die;
   }
}

//Start Of Algorithm
checkURLValid();

debug_to_console("\nrequesting clearbit\n\n");
if(!tryDisplay(clearbit(), 'clearbit')) {
  debug_to_console("\nrequesting bestIcon\n\n");
  if(!tryDisplay(bestIcon(), 'bestIcon')) {
    debug_to_console("\nrequesting page2img\n\n");
    if(!tryDisplay(pageToImages(), 'page2img')) {
      debug_to_console("\nrequesting thumbnailws\n\n");
      if(!tryDisplay(thumbnailws(), 'thumbnailws')) {
        debug_to_console("\nAll API exhausted. Fatal -> Display Error!\n\n");
        $errorMsg = "UNKNOWN ERROR";
        displayError($errorMsg);
      }
    }
  }
}

?>
