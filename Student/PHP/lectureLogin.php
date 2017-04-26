<?php
session_start();
require '../../Database.php';
$db = new Database();
$lecture = $db->getLectureByID($_GET["lecturePin"]);
if($lecture && $lecture["date"]){
  $_SESSION["lecturePin"] = $lecture["ID"];
  header("Location: ../student.html");
}else{
  header("Location: ../studentNotInLecture.html");
}
?>
