<?php

session_start();

include '../Database.php';

$ID = $_POST["ID"];

$db = new Database();

$success = $db->getLectureByID($ID);

$data = json_encode($success);

echo $data;

?>
