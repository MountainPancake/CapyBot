<?php
    session_start();
    include '../Database.php';
    $lecture_ID = $_SESSION["lecturePin"];
    $db = new Database();
    $success = $db->getResponseTypesByLectureID($lecture_ID);
    $data = json_encode($success);
    echo $data;
?>
