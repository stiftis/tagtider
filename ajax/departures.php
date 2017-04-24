<?php
$id = $_GET['id'];

$url     = 'http://api.tagtider.net/v1/stations/' . $id . '/transfers/departures.json';
$user    = 'tagtider';
$pass    = 'codemocracy';
$options = array(
    CURLOPT_FRESH_CONNECT   => 1,
    CURLOPT_URL             => $url,
    CURLOPT_USERPWD         => $user . ":" . $pass,
    CURLOPT_HTTPAUTH        => CURLAUTH_DIGEST,
    CURLOPT_RETURNTRANSFER  => 3,
);

// Handle and return
$ch = curl_init();
//set the curl options from the array $options
curl_setopt_array($ch, $options);
//
$response = curl_exec($ch);


$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);

if (!$response) echo curl_error($ch) . " " . curl_errno($ch);
if($response) echo $response;

curl_close($ch);

?>
