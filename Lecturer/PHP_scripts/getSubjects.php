<?php

session_start();

include '../../Database.php';

$email = $_SESSION["email"];

$db = new Database();

$success = $db->getCategoriesByEmail($email);

$data = json_encode($success);

echo $data;

?>
