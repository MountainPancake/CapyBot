<?php
    session_start();
    require '../Database.php';
    $lecture_ID = $_SESSION["lecturePin"];
    $text = $_POST["question"];text;
    $db = new Database();
    $db->insertPost($lecture_ID,$text);
?>
