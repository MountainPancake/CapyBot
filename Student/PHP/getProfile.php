<?php
    session_start();
    require '../../Database.php';
    $email = $_SESSION["email"];
    $db = new Database();
    $success = $db->getUserByEmail($email);
    $data = json_encode($success);
    echo $data;
?>
