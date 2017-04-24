<?php
    session_start();
    require '../Database.php';
    $lecture_ID = $_SESSION["lecturePin"];
    $posted_by_ID = $_SESSION["email"];
    $text = $_POST["question"];
    $db = new Database();
    $db->insertPost($lecture_ID,$posted_by_ID,$text);
?>
