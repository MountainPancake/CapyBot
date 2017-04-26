<?php
session_start();
require '../../Database.php';

$lectureID = $_SESSION["lecturePin"];
$responseType = $_POST["responseType"];
$db = new Database();
$inserted = $db->insertResponse($lectureID,$responseType);

if($inserted){
  echo "success";
}else{
  echo "invalid";
}
?>
