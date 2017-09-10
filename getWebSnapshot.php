<?php

$origLink = 'undef';
$finalLink = 'undef';

if (isset($_GET['link'])) {

        $origLink = $_GET['link'];
        //echo $origLink;

    }else{
        // Fallback behaviour goes here
        echo "\r\nERROR. No URL Defined";
        die;
    }



function get_http_response_code($link) {
  $headers = get_headers($link);
  return substr($headers[0], 9, 3);
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
  $thumbnailws .= "&width=128";
  return $thumbnailws;
}

function clearbit() {
  $clearbit = "https://logo.clearbit.com/";
  $clearbit .= $_GET['link'];
  return get_final_url($clearbit);
}
function displayError($text) {

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
  imagedestroy($img);

}

function tryDisplay($checkLink) {
  $get_http_response_code = get_http_response_code($checkLink);

  if ( $get_http_response_code == 200 ) {
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

  $get_http_response_code = get_http_response_code($curLink);
  if ( $get_http_response_code != 200 && $get_http_response_code != 301 && $get_http_response_code != 302) {
    $errorMsg = " URL INVALID";
    displayError($errorMsg);
    die;
   }

}

checkURLValid();

if(!tryDisplay(clearbit())) {
  if(!tryDisplay(thumbnailws())) {
    $errorMsg = " Please Refresh!";
    displayError($errorMsg);
  }
}

?>
