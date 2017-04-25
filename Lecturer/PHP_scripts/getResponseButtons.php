<?php

session_start();

include '../Database.php';

$lecture_ID = $_POST["lectureID"];

$db = new Database();

$success = $db->getResponseTypesByLectureID($lecture_ID);

$data = json_encode($success);

echo $data;

?>
