<?php
    session_start();
    require '../Database.php';
    $lecture_ID = $_SESSION["lecturePin"];
    $posted_by_email = $_SESSION["email"];
    $text = $_POST["question"];
    $db = new Database();
    $user = $db->getUserByEmail($posted_by_email);
    if($user){
        $posted_by_ID = $user["ID"];
        $db->insertPost($lecture_ID,$posted_by_ID,$text);
    }
?>
