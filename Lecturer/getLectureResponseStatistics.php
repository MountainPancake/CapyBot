<?php
session_start();
require '../Database.php';
$db = new Database();

$lecture_ID = $_POST["lectureID"];

$responseCountArray = $db->getResponseTypesAndCountByLectureID($lecture_ID);

echo json_encode($responseCountArray);
?>
