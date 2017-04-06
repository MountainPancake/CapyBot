<?php
    session_start();
    require '../Database.php';
    $db = new Database();
    $posts = $db->getPostsByLectureID($_SESSION["lecturePin"]);

    echo $posts;

    /*
    $questions->question = "??????????";
    $questions->upvotes = 23;

    $jsonQuestions = json_encode($questions);

    $my_array = array("Dog","Cat","Horse");

    list($a, $b, $c) = $my_array;
    echo "I have several animals, a $a, a $b and a $c.";

    echo $jsonQuestions;

    echo $postsArray;*/
?>
