<?php

session_start();

include '../../Database.php';

$email = $_POST["email"];
$password = $_POST["password"];




$db = new Database();


$success = $db->getUserByEmailAndPassword($email, $password);




if ($success and $success["is_student"]=="1"){
	$_SESSION["email"] = $email;
	echo "success";
}
else{
	echo "invalid";
}


?>
