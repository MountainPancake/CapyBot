<?php
    session_start();
    include '../../Database.php';
    $ID = $_SESSION["lecturePin"];
    $db = new Database();
    $success = $db->getLectureByID($ID);
    $data = json_encode($success);
    echo $data;
?>
