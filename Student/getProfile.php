<?php
    session_start();
    require '../Database.php';
    $db = new Database();
    $profil = $db->getUserByEmail($_SESSION["email"]);

    echo $profile;
?>
