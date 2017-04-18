<?php

<<<<<<< HEAD
    json_decode($posts, true);

    echo $posts;
=======
session_start();
require '../Database.php';
$db = new Database();
$posts = $db->getPostsByLectureID($_SESSION["lecturePin"]);
echo json_encode($posts);

>>>>>>> 5491e8b64794fb3159b3d9416534e680c3ed3ed0
?>
