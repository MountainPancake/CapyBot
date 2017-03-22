<?php

class Database{
  public $con;

  function __construct(){
    $this->connect();
  }

  function __destruct(){
    $this->disconnect();
  }

  function createStudentUser($email, $firstname, $lastname, $university, $password){
    insertUser($email, $password, $firstname, $lastname, $university, 1);
  }

  function createLecturerUser($email, $password, $firstname, $lastname, $university){
    insertUser($email, $password, $firstname, $lastname, $university, 0);
  }

  function login($email, $password){
    $sql = "SELECT email, password FROM User
    WHERE email = '$email' and password = '$password";
    return mysql_query($this->con, $sql);
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
  function insertUser($email, $password, $firstname, $lastname, $university, $is_student){
  	$sql = "INSERT INTO User (ID, name, e_mail, is_student)
  	VALUES (NULL, '$email' ,, $password','$firstname', '$lastname',  '$university', '$is_student')";

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
    $sql = "SELECT * FROM User WHERE e_mail = '$mail'";
    $assoc_array = mysqli_fetch_assoc(mysqli_query($this->con, $sql));
    return $assoc_array;
  }

//Misc
  function printAllUsers(){
    $query = "SELECT name, is_student FROM User";
    $result = mysqli_query($this->con, $query);
    while($row = mysqli_fetch_assoc($result)){
      echo $row["name"]." This person is a ".(!$row["is_student"]?"lecturer":"student")."<br>";
    };
  }

}
?>
