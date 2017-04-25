<?php
    session_start();
    require '../Database.php';
    $db = new Database();
    $points = $db->getPointsByUserEmail($_SESSION["email"]);
    /*
    usort($posts, function($a,$b){
      return $b["time_posted"] <=> $a["time_posted"];
    });*/

    echo json_encode($points);
?>
