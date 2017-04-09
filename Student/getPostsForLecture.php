<?php

session_start();
require '../Database.php';
$db = new Database();
$posts = $db->getPostsByLectureID($_SESSION["lecturePin"]);
echo json_encode($posts);

?>
