<?php

class Database{
  public $con;

  function __construct(){
    $this->connect();
  }

  function __destruct(){
    $this->disconnect();
  }

  function connect(){
    $servername = "mysql.stud.ntnu.no";
    $username = "capybotpu";
    $password = "1234";
    $dbname = "capybotpu_db";
    // Create connection
    $this->con = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$this->con) {
        die("Connection failed: ");
    }else{
      echo "Connected very successfully<br>";
    }
  }

  function disconnect(){
    mysqli_close($this->con);
  }
//Inserts
  function insertUser($first_name, $last_name, $email, $is_student){
  	$sql = "INSERT INTO User (ID, name, e_mail, is_student)
  	VALUES (NULL, '$first_name', '$last_name','$email','$is_student')";

    return mysqli_query($this->con, $sql);
  }

  function insertLecture($lecturer_mail,$date,$time){
    $sql = "INSERT INTO Lecture (ID, lecturer_mail, date_time)
  	VALUES (NULL, '$lecturer_mail','$date $time')";
    echo $sql;
    return mysqli_query($this->con, $sql);
  }


//Getters
  function getUserByMail($mail){
  }

//Misc
  function printAllUsers(){
    $query = "SELECT first_name, last_name, is_student FROM User";
    $result = mysqli_query($this->con, $query);
    while($row = mysqli_fetch_assoc($result)){
      echo $row["first_name"]." This person is a ".(!$row["is_student"]?"lecturer":"student")."<br>";
    };
  }

}
?>