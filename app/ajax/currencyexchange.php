<?php
// set API Endpoint and API key
$access_key = '517b69de-8cea-4050-82de-f0995735a532';
// Initialize CURL:
$ch = curl_init('https://v2.api.forex/rates/latest.json?beautify=true&key='.$access_key.'');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Store the data:
$json = curl_exec($ch);
curl_close($ch);
// Decode JSON response:
$exchangeRates = json_decode($json, true);
$results = $exchangeRates['rates'];

?>