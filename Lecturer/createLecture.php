<?php
include '../Database.php';

$lecturer_mail = $_POST["email"];
$category_name = $_POST["category"];
$date = $_POST["date"];
$time = $_POST["time"];

$db = new Database();

$db->insertLecture($lecturer_mail,$category_name,$date,$time);

?>
