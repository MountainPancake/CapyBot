<?php

echo "success";

include '../Database.php';

$category = $_POST["category"];
$name = $_POST["name"];
$date = $_POST["date"];
$time = $_POST["time"];

$db = new Database();

$db->insertLecture($category,$name,$date,$time);

if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>
