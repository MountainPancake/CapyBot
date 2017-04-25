<?php
session_start();

include '../Database.php';

$email = $_SESSION["email"];
$categoryName = $_POST["categoryName"];
$db = new Database();

$success = $db->insertCategory($categoryName,$email);

if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>
