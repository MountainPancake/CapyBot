<?php
session_start();
include 'Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

echo "$email $password<br>";

$db = new Database();
$_SESSION["email"] = $db->login($email,$password)["e_mail"];

?>
