<?php
    session_start();
    require '../../Database.php';
    $db = new Database();
    $success = $db->getAllStudents();

    usort($success, function($a,$b){
      return $b["points"] <=> $a["points"];
    });

    $data = json_encode($success);
    echo $data;
?>
