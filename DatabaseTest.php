<?php

include 'Database.php';


$db = new Database();
$db->disconnect();
echo $db->connect();
echo $db->getUserByMail('haraldvinje@gmail.com'). " Users are here ";
echo $db->getLecturesByMailAndCategory('alg@dat.com', 'AlgDat'). " Testing getLecturesByMailAndCategory";

?>
