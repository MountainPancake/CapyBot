<?php
session_start();
include 'Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

echo "$email $password<br>";
$db = new Database();
$_SESSION["email"] = $db->login($email,$password)["e_mail"];
$_SESSION["firstName"] = $db->login($email,$password)["first_name"];
$_SESSION["lastName"] = $db->login($email,$password)["last_name"];

header("Location: /Lecturer/loggedin.php");
exit;
?>
