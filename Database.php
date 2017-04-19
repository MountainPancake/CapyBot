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

  function login($email, $password){
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

  function getLecturesByEmail($email){
    $sql = "SELECT * FROM Lecture where lecturer_email = '$email'";
    $result = mysqli_query($this->con, $sql);
    $lecturesArray;
    $i = 0;
    while($row = mysqli_fetch_assoc($result)){
      $lecturesArray[$i] = $row;
      $i++;
    }
    return $lecturesArray;
  }

  function getLectureByID($ID){
    $query = "SELECT * FROM Lecture WHERE ID = '$ID'";
    $result = mysqli_query($this->con, $query);
    return mysqli_fetch_assoc($result);
  }

  function getLecturesByEmailAndCategory($email, $category){
    $query = "SELECT * FROM Lecture WHERE lecturer_mail = '$email' AND category_name = '$category'";
    $result = mysqli_query($this->con, $query);
    while ($row = mysqli_fetch_assoc($result)){
      echo $row["lecturer_email"]. " Mail of lecturer <br>". "Category: ". $row['category_name'];
    }
  }

  function insertResponseType($text, $lecture_id){
      $sql = "INSERT INTO Response_Types ('Text', lecture_id)
      VALUES ('$text','$lecture_id')";
      return mysqli_query($this->con, $sql);
  }

  function getResponseTypesByLectureID($lecture_id){
    $sql = "SELECT * FROM Response_Types where lecture_id = '$lecture_id'";
    $result = mysqli_query($this->con, $sql);
    $responseTypesArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($responseTypesArray, $row);
    }
    return $responseTypesArray;
  }

  function deleteResponseTypeByLectureIDAndText($lecture_id, $text){
    $sql = "DELETE FROM Response_Types WHERE lecture_id = '$lecture_id' and text = '$text'";
    return mysqli_query($this->con, $sql);
  }

 //Category
  function insertCategory($categoryName,$email){
      $sql = "INSERT INTO Category (name, lecturer_email)
      VALUES ('$categoryName','$email')";
      return mysqli_query($this->con, $sql);
  }

  function deleteAllCategoriesByEmail($email){
    $sql = "DELETE FROM Category WHERE email = '$email'";
    return mysqli_query($this->con, $sql);
  }

  function deleteCategoryByNameAndEmail($category_name, $lecturer_email){
    $sql = "DELETE FROM Category WHERE name = '$category_name' AND lecturer_email = '$lecturer_email'";
    return mysqli_query($this->con, $sql);
  }

  function getCategoriesByEmail($email){
    $sql = "SELECT * FROM Category where lecturer_email = '$email'";
    $result = mysqli_query($this->con, $sql);
    $categoriesArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($categoriesArray, $row);
    }
    return $categoriesArray;
  }

//Post
  function insertPost($lecture_ID,$text){
    $sql = "INSERT INTO Post (ID, lecture_ID, posted_by_ID, text, upvotes, time_posted)
    VALUES (NULL, '$lecture_ID', NULL, '$text', 0, CURRENT_TIMESTAMP)";
    return mysqli_query($this->con, $sql);
  }

  function deletePostByID($ID){
    $sql = "DELETE FROM Post WHERE ID = '$ID'";
    return mysqli_query($this->con, $sql);
  }

  function getPostByID($ID){
    $sql = "SELECT * FROM Post WHERE ID = '$ID'";
    $result = mysqli_query($this->con, $sql);
    return mysqli_fetch_assoc($result);
  }

  function getPostsByLectureID($lecture_ID){
    $sql = "SELECT * FROM Post WHERE lecture_ID = '$lecture_ID'";
    $result = mysqli_query($this->con, $sql);
    $postsArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($postsArray, $row);
    }
    return $postsArray;
  }

  function upvotePostByID($ID){
    $sql = "UPDATE Post SET upvotes = upvotes + 1 WHERE ID = '$ID'";
    $result = mysqli_query($this->con, $sql);
    return $result;
  }


//Class end
}
?>
