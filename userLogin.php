<?php
include 'Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

echo "$email $password<br>";

$db = new Database();

echo $db->getUserByMail($email)["first_name"];
?>
