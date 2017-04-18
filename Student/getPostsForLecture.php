<?php
    session_start();
    require '../Database.php';
    $db = new Database();
    $posts = $db->getPostsByLectureID($_SESSION["lecturePin"]);

    json_decode($posts, true);

    echo $posts;
?>
