<?php
    session_start();
    include '../../Database.php';
    $lectureID = $_SESSION["lecturePin"];
    $db = new Database();
    $success = $db->getResponseTypesByLectureID($lectureID);
    $data = json_encode($success);
    echo $data;
?>
