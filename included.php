<?php

function foo(){
  $servername = "mysql.stud.ntnu.no";
  $username = "capybotpu";
  $password = "1234";
  $dbname = "capybotpu_db";
  // Create connection
  $con = mysqli_connect($servername, $username, $password, $dbname);

  // Check connection
  if (!$con) {
      die("Connection failed: ");
  }else{
    echo "Connected very successfully<br>";
  }
  return $con;
}

function printAllUsers($con){
  $con = foo();
  $query = "SELECT * FROM User";
  $result = mysqli_query($con, $query);
  while($row = mysqli_fetch_row($result)){
    echo $row[1]."<br>";
    echo "This person is a ".(!$row[3]?"lecturer":"student")."<br>";
    echo "<br>";
  };
}

function addUser($name, $email, $is_student){
	$con = foo();
	$sql = "INSERT INTO `User` (`ID`, `name`, `e_mail`, `is_student`)
	VALUES (NULL,". $name.",". $email.",". $is_student.")";
  echo $sql;
	if (mysqli_query($con, $sql)){
		echo "New guy successfully added";
	}
	else{
		echo "Failed to insert new guy";
	}
  echo "<br>";
}

?>
