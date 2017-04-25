<?php
session_start();

include '../../Database.php';

$email = $_SESSION["email"];

$category = $_POST["category"];
$name = $_POST["name"];
$date = $_POST["date"];
$time = $_POST["time"];

$db = new Database();

$success = $db->insertLecture($email,$category,$date,$time,$name);

if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>
