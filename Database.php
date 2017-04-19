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
    return isset($this->con);
  }

  function disconnect(){
    return mysqli_close($this->con);
  }

//User methods
  function insertUser($email, $password, $firstname, $lastname, $university, $is_student){
  $sql = "INSERT INTO User (ID, email, password, first_name, last_name, university, is_student)
  VALUES (NULL, '$email' , '$password','$firstname', '$lastname',  '$university', '$is_student')";
  return (mysqli_query($this->con, $sql));
  }

  function deleteUserByEmail($email){
    $sql = "DELETE FROM User WHERE email = '$email'";
    return mysqli_query($this->con, $sql);
  }

  function getUserByEmail($email){
    $sql = "SELECT * FROM User WHERE email = '$email'";
    $assoc_array = mysqli_fetch_assoc(mysqli_query($this->con, $sql));
    return $assoc_array;
  }

  function createStudentUser($email, $password, $firstname, $lastname, $university){
    $this->insertUser($email, $password, $firstname, $lastname, $university, 1);
  }

  function createLecturerUser($email, $password, $firstname, $lastname, $university){
    $this->insertUser($email, $password, $firstname, $lastname, $university, 0);
  }

  function getUserByEmailAndPassword($email, $password){
    $sql = "SELECT * FROM User WHERE email = '$email' and password = '$password'";

    return mysqli_fetch_assoc(mysqli_query($this->con, $sql));
  }

  function printAllUsers(){
    $query = "SELECT first_name as name, is_student as student FROM User";
    $result = mysqli_query($this->con, $query);
    while($row = mysqli_fetch_assoc($result)){
      echo $row["name"]." This person is a ".(!$row["student"]?"lecturer":"student")."<br>";
    }
  }


//Lecture
  function insertLecture($lecturer_email,$category_name,$date,$time,$title){
    $sql = "INSERT INTO `Lecture` (`ID`, `lecturer_email`, `category_name`, `date`, `time`, `title`)
    VALUES (NULL, '$lecturer_email', '$category_name', '$date', '$time', '$title')";
    return mysqli_query($this->con, $sql);
  }

  function deleteLectureByID($ID){
    $sql = "DELETE FROM Lecture WHERE ID = '$ID'";
    return mysqli_query($this->con, $sql);
  }

  function insertPost($lecture_ID,$text){
    $sql = "INSERT INTO Post (ID, lecture_ID, posted_by_ID, text, upvotes, time_posted)
    VALUES (NULL, '$lecture_ID', NULL, '$text', 0, CURRENT_TIMESTAMP)";
    return mysqli_query($this->con, $sql);
  }

  function getLecturesByEmail($email){
    $sql = "SELECT * FROM Lecture where lecturer_email = '$email'";
    $result = mysqli_query($this->con, $sql);
    $lecturesArray;
    while($row = mysqli_fetch_assoc($result)){
      $lecturesArray[$row["ID"]] = $row;
    }
    return json_encode($lecturesArray);
  }

  function getLecturesByEmailAndCategory($email, $category){
    echo "<br>in function";
    $query = "SELECT * FROM Lecture WHERE lecturer_mail = '$email' AND category_name = '$category'";
    $result = mysqli_query($this->con, $query);
    while ($row = mysqli_fetch_assoc($result)){
      echo $row["lecturer_email"]. " Mail of lecturer <br>". "Category: ". $row['category_name'];
    }
  }

  function getCategoriesByEmail($email){
    $sql = "SELECT name FROM Category where lecturer_email = '$email'";
    $result = mysqli_query($this->con, $sql);
    $categoriesArray;
    while($row = mysqli_fetch_assoc($result)){
      $categoriesArray[$row["name"]] = $row;
    }
    return json_encode($categoriesArray);
  }

  function insertCategory($categoryName,$email){
      $sql = "INSERT INTO Category (name, lecturer_email)
      VALUES ('$categoryName','$email')";
      return mysqli_query($this->con, $sql);
  }

//Class end
  function getPostsByLectureID($lecture_ID){
    $sql = "SELECT * FROM Post WHERE lecture_ID = '$lecture_ID'";
    $result = mysqli_query($this->con, $sql);
    $postsArray;
    while($row = mysqli_fetch_assoc($result)){
      $postsArray[$row["ID"]] = $row;
    }
    return json_encode($postsArray);
  }
}
?>
