<?php
    session_start();
    require '../Database.php';
    $post_ID = $_POST["ID"];
    $db = new Database();
    $db->upvotePostByID($ID);
?>
