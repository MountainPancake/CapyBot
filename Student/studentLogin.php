<?php

session_start();

require 'Database.php';

$email = $_POST["email"];
$password = $_POST["password"];


echo "Hello";
/*
$db = new Database();

/*
$success = $db->getUserByEmailAndPassword($email, $password);

echo $success;

echo $success["is_student"];

if ($success and $success["is_student"]=="1"){
	$_SESSION["email"] = $email;
	$_SESSION["password"] = $password;
	echo "Success";
}
else{
	echo "Invalid";
}
*/

?>
