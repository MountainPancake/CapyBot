<?php
include 'Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

echo "$email $password<br>";
/*
$db = new Database();
echo $db->insertUser($email,$password,"Mr.", "Hetland", "NTNU", 0);
echo $db->userLogin($email, $password);
*/
?>
