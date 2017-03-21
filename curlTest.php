<?php
//
// A very simple PHP example that sends a HTTP POST to a remote site
//

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"http://folk.ntnu.no/hzsvela/CapyBot/userLogin.php");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,
            "email=hetland@capcap.com&&password=1234");

// in real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS,
//          http_build_query(array('postvar1' => 'value1')));

// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);

curl_close ($ch);

echo $server_output;

?>
