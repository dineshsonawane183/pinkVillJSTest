<?php

$feedData = [];
$sourceString = "";
function makecurlcall()
{
    if($_SERVER['REQUEST_METHOD']== "GET" ){
        $url = "http://www.pinkvilla.com/photo-gallery-feed-page/page/".$_GET['step'];
    }
    $url = "http://www.pinkvilla.com/photo-gallery-feed-page";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $result = json_decode($response);
    curl_close($ch);
    return $result;
}
function sendResponse($response)
{
    header("Content-Type: application/json");
    echo json_encode($response);
    die;
}
function init()
{
    global $feedData;
    $feedData = makecurlcall();
    sendResponse($feedData);
}
init();

?>
