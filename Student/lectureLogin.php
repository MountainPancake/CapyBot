<?php
session_start();
$_SESSION["lecturePin"] = $_GET["lecturePin"];
header("Location: student.php");


?>
