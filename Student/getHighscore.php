<?php

    $highscore->place = 1;
    $highscore->nickname = "Frid";
    $highscore->points = 1450;

    $jsonHighscore = json_encode($highscore);

    echo $jsonHighscore;
?>
