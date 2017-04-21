<?php

session_start();

include 'Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

$db = new Database();


$success = $db->insertUser($email, $password, "null", "null", "null", 1);


if ($success){
	echo "success";
}
else{
	echo "invalid";
}


?>