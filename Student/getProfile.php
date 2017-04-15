<?php

    $profile->firstName = "Fride";
    $profile->lastName = "Skarseth";
    $profile->points = 1450;
    $profile->rank = "CAPYBARA";

    $jsonProfile = json_encode($profile);

    echo $jsonProfile;
?>
