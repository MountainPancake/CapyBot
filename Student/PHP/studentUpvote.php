<?php
    session_start();
    require '../../Database.php';
    $post_ID = $_GET["ID"];
    $db = new Database();
    $db->upvotePostByID($post_ID);
    $post = $db->getPostByID($post_ID);
    echo json_encode($post);
?>
