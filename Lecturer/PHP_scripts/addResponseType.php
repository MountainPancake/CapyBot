<?php
session_start();

include '../../Database.php';

$text = $_POST["responseType"];
$lecture_ID = $_POST["lectureID"];
$db = new Database();

$success = $db->insertResponseType($lecture_ID,$text);

if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>
