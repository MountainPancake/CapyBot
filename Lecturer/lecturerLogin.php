<?php
session_start();
include '../Database.php';

$email = $_POST["email"];
$password = $_POST["password"];

$db = new Database();
$assocUserArray = $db->getUserByEmailAndPassword($email,$password);
if($assocUserArray){
  $_SESSION["email"] = $assocUserArray["email"];
  $_SESSION["firstName"] = $assocUserArray["first_name"];
  $_SESSION["lastName"] = $assocUserArray["last_name"];
  echo "success";
}else{
  echo "invalid";
}
?>
