<?php

session_start();

include '../Database.php';

$email = $_SESSION["email"];
$category = $_POST["category"];

$db = new Database();

$success = $db->getLecturesByEmailAndCategory($email, $category);

$data = json_encode($success);

echo $data;

?>
