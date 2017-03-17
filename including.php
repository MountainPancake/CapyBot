<?php
include "included.php";

$db = new Database();
$db->insertUser("Mr. Hetland", "hetland@capcap.com", 0);
$db->printAllUsers();
$db->insertLecture("hetland@capcap.com","2017-03-15","15:40:00");
?>
