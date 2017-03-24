<?php
session_start();
include '../Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

echo "$email $password<br>";

$db = new Database();
$assocUserArray = $db->login($email,$password);
if($assocUserArray){
  $_SESSION["email"] = $assocUserArray["e_mail"];
  $_SESSION["firstName"] = $assocUserArray["first_name"];
  $_SESSION["lastName"] = $assocUserArray["last_name"];
  header("Location: loggedin.php");
}else{
  header("Location: lecturerindex.html");
}
?>
