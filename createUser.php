<html>
<?php
$servername = "mysql.stud.ntnu.no";
$username = "capybotpu";
$password = "1234";
$dbname = "capybotpu_db";
// Create connection
$con = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}else{
  echo "Connected very successfully<br>";
}


$sql = "INSERT INTO `User` (`ID`, `name`, `e_mail`, `is_student`) 
VALUES (NULL, 'new guy', 'newguy@cooldomain.com', '1')";
if (mysqli_query($con, $sql)){
	echo "New guy successfully added";
} else{
	echo "Failed to insert new guy";
}
mysqli_close($con);
?>
</html>
