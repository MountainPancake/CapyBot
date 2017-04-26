<?php
    session_start();
    require '../../Database.php';
    $userEmail = $_SESSION["email"];
    $points = $_POST["points"];
    $db = new Database();
    $db->addPointsByUserEmail($userEmail, $points);
?>
