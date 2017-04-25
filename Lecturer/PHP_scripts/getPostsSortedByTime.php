<?php
  require '../../Database.php';
  $db = new Database();
  $posts = $db->getPostsByLectureID($_POST["lectureID"]);
  usort($posts, function($a,$b){
    return $b["time_posted"] <=> $a["time_posted"];
  });
  echo json_encode($posts);
?>
