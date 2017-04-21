<?php
  session_start();
  require '../Database.php';
  $db = new Database();
  $posts = $db->getPostsByLectureID($_GET["lecturePin"]);
  usort($posts, function($a,$b){
    return $b["time_posted"] <=> $a["time_posted"];
  });
  echo json_encode($posts);
?>
