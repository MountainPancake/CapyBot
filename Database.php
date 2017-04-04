<?php

class Database{
  public $con;

  function __construct(){
    $this->connect();
  }

  function __destruct(){
    $this->disconnect();
  }

  function createStudentUser($email, $password, $firstname, $lastname, $university){
    $this->insertUser($email, $password, $firstname, $lastname, $university, 1);
  }

  function createLecturerUser($email, $password, $firstname, $lastname, $university){
    $this->insertUser($email, $password, $firstname, $lastname, $university, 0);
  }

  function login($email, $password){
    $sql = "SELECT * FROM User WHERE e_mail = '$email' and password = '$password'";

    return mysqli_fetch_assoc(mysqli_query($this->con, $sql));
  }

  function connect(){
    $servername = "mysql.stud.ntnu.no";
    $username = "capybotpu";
    $password = "1234";
    $dbname = "capybotpu_db";
    // Create connection
    $this->con = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    return isset($this->con);
  }

  function disconnect(){
    mysqli_close($this->con);
  }
//Inserts
  function insertUser($email, $password, $firstname, $lastname, $university, $is_student){
  	$sql = "INSERT INTO User (ID, e_mail, password, first_name, last_name, university, is_student)
  	VALUES (NULL, '$email' , '$password','$firstname', '$lastname',  '$university', '$is_student')";
    if(mysqli_query($this->con, $sql)){
      return true;
    }
    else{
      return false;
    }
  }

  function insertLecture($lecturer_mail,$category_name,$date,$time){
    $sql = "INSERT INTO `Lecture` (`ID`, `lecturer_mail`, `category_name`, `date`, `time`)
    VALUES (NULL, '$lecturer_mail', '$category_name', '$date', '$time')";
    if(mysqli_query($this->con, $sql)){
      return true;
    }else{
      return false;
    }
  }

  function getLecturesByMail($mail){
    $sql = "SELECT Title, date, time, category_name FROM Lecture where lecturer_mail = '$mail'";
    $assoc_array = mysqli_fetch_assoc(mysql_query($this->con, $sql)); 
    return $assoc_array;
  }


  function getLecturesByMailAndCategory($mail, $category){
    echo "<br>in function";
    $query = "SELECT * FROM Lecture WHERE lecturer_mail = '$mail' AND category_name = '$category'";
    $result = mysqli_query($this->con, $query);
    while ($row = mysqli_fetch_assoc($result)){
      echo $row["lecturer_mail"]. " Mail of lecturer <br>". "Category: ". $row['category_name'];
    }
  }



//Getters
  function getUserByMail($mail){
    $sql = "SELECT first_name FROM User WHERE e_mail = '$mail'";
    $assoc_array = mysqli_fetch_assoc(mysqli_query($this->con, $sql));
    return $assoc_array['first_name'];
  }


//Misc
  function printAllUsers(){
    $query = "SELECT first_name as name, is_student as student FROM User";
    $result = mysqli_query($this->con, $query);
    while($row = mysqli_fetch_assoc($result)){
      echo $row["name"]." This person is a ".(!$row["student"]?"lecturer":"student")."<br>";
    };
  }

}
?>
