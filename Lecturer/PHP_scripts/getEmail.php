<?php

session_start();

include '../../Database.php';

$email = $_SESSION["email"];

$db = new Database();

$data = json_encode($email);

echo $data;

?>
