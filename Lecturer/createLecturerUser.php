<?php
  include '../Database.php';

  $firstName = $_POST["firstName"];
  $lastName = $_POST["lastName"];
  $email = $_POST["email"];
  $university = $_POST["university"];
  $password= $_POST["password"];

  $db = new Database();
  $db->createLecturerUser($email, $password, $firstName, $lastName, $university);
  header("Location: lecturerIndex.html");
?>
