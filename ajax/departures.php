<?php
$id = $_GET['id'];

$url     = 'http://api.tagtider.net/v1/stations/' . $id . '/transfers/departures.json';
$user    = 'tagtider';
$pass    = 'codemocracy';
$options = array(
    //Always new connection
    CURLOPT_FRESH_CONNECT   => 1,
    CURLOPT_URL             => $url,
    CURLOPT_USERPWD         => $user . ":" . $pass,
    //Which authentication is used
    CURLOPT_HTTPAUTH        => CURLAUTH_DIGEST,
    //return the transfer as a string of the return value of curl_exec()
    //instead of outputting it out directly.
    CURLOPT_RETURNTRANSFER  => 3,
);

// Handle and return
$ch = curl_init();
//set the curl options from the array $options
curl_setopt_array($ch, $options);
$response = curl_exec($ch);

if (!$response) echo curl_error($ch) . " " . curl_errno($ch);
if($response) echo $response;

curl_close($ch);

?>
