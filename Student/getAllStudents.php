<?php
    session_start();
    require '../Database.php';
    $db = new Database();
    $success = $db->getAllStudents();
    $data = json_encode($success);
    echo $data;
?>
