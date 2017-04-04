<?php
  session_start();
  require '../Database.php';
  $db = new Database();
  $dbLecture = $db->getLectureByID($_SESSION["lecturePin"]);
  $lecture->PIN = $dbLecture["ID"];
  $lecture->date = $dbLecture["date"];
  $lecture->responses = ["Slow down","Speed up", "Too hard","Too easy"];
  $lecture->category = $dbLecture["category"];

  $jsonLecture = json_encode($lecture);

  echo $jsonLecture;
?>
