<?php
include '../Database.php';

$db = new Database();

$lecture_ID = $_GET["lectureID"];

$resTypes = $db->getResponseTypesByLectureID($lecture_ID);

foreach ($resTypes as $resType) {
  echo $resType["text"]."<br/>";
  $amount = rand ( 7 , 40 );
  for($i = 0; $i < $amount; $i++){
    $db->insertResponse($lecture_ID,$resType["text"]);
  }
}

?>
