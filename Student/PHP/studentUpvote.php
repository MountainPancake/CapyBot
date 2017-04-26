<?php
    session_start();
    require '../../Database.php';
    $postID = $_GET["ID"];
    $db = new Database();
    $db->upvotePostByID($postID);
    $post = $db->getPostByID($postID);
    echo json_encode($post);
?>
