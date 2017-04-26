<?php
    session_start();
    require '../Database.php';
    $db = new Database();
    $points = $db->getPointsByUserEmail($_SESSION["email"]);
    echo json_encode($points);
?>
