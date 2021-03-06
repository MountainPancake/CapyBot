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

  function getAllStudents(){
    $sql = "SELECT * FROM User WHERE is_student = '1'";
    $result = mysqli_query($this->con, $sql);
    $studentsArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($studentsArray, $row);
    }
    return $studentsArray;
  }

  function addPointsByUserEmail($userEmail,$points){
    $sql = "UPDATE User SET points = points + $points WHERE email = '$userEmail'";
    return mysqli_query($this->con, $sql);
  }

  function getPointsByUserEmail($email){
    $sql = "SELECT * FROM User WHERE email = '$email'";
    $result = (mysqli_query($this->con, $sql));
    $pointsArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($pointsArray, $row);
    }
    return $pointsArray;
  }

  function createStudentUser($email, $password, $firstname, $lastname, $university){
    return $this->insertUser($email, $password, $firstname, $lastname, $university, 1);
  }

  function createLecturerUser($email, $password, $firstname, $lastname, $university){
    return $this->insertUser($email, $password, $firstname, $lastname, $university, 0);
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

  function getLecturesByEmail($email){
    $sql = "SELECT * FROM Lecture where lecturer_email = '$email'";
    $result = mysqli_query($this->con, $sql);
    $lecturesArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($lecturesArray, $row);
    }
    return $lecturesArray;
  }

  function getLectureByID($ID){
    $query = "SELECT * FROM Lecture WHERE ID = '$ID'";
    $result = mysqli_query($this->con, $query);
    return mysqli_fetch_assoc($result);
  }


  function getLecturesByEmailAndCategory($email, $category){
    $query = "SELECT * FROM Lecture WHERE lecturer_email = '$email' AND category_name = '$category'";
    $result = mysqli_query($this->con, $query);
    $lecturesArray;
    $i = 0;
    while($row = mysqli_fetch_assoc($result)){
      $lecturesArray[$i] = $row;
      $i++;

    }
    return $lecturesArray;
  }

  //Response_Type
  function insertResponseType($lecture_ID,$text){
      $sql = "INSERT INTO Response_Type (lecture_ID, text)
      VALUES ('$lecture_ID','$text')";
      return mysqli_query($this->con, $sql);
  }

  function deleteResponseTypeByLectureIDAndText($lecture_ID, $text){
    $sql = "DELETE FROM Response_Type WHERE lecture_ID = '$lecture_ID' and text = '$text'";
    return mysqli_query($this->con, $sql);
  }


  function getResponseTypesByLectureID($lecture_ID){
    $sql = "SELECT * FROM Response_Type WHERE lecture_ID = '$lecture_ID'";
    $result = mysqli_query($this->con, $sql);
    $responseTypesArray = [];
    while($row = mysqli_fetch_assoc($result)){
      array_push($responseTypesArray, $row);
    }
    return $responseTypesArray;
  }

//Response
  function insertResponse($lecture_ID, $response_type){
    $sql = "INSERT INTO `Response`(`lecture_ID`, `response_type`, `time_stamp`)
    VALUES ('$lecture_ID', '$response_type', CURRENT_TIMESTAMP)";
    return mysqli_query($this->con, $sql);
  }

  function getResponseCount($lecture_ID, $response_type){
    $sql = "SELECT COUNT(response_type) as count FROM Response
    WHERE lecture_ID = '$lecture_ID' and response_type = '$response_type'
    GROUP BY response_type";
    $result = mysqli_query($this->con, $sql);
    return mysqli_fetch_assoc($result)["count"];
  }

  function deleteAllResponsesByLectureID($lecture_ID){
    $sql = "DELETE FROM Response WHERE lecture_ID = '$lecture_ID'";
    return mysqli_query($this->con, $sql);
  }

//Response type and count
function getResponseTypesAndCountByLectureID($lecture_ID){
  $sql = "SELECT response_type, COUNT(response_type) as count FROM Response
  WHERE lecture_ID = '$lecture_ID'
  GROUP BY response_type";
  $result = mysqli_query($this->con, $sql);
  $responseCountArray = [];
  while($row = mysqli_fetch_assoc($result)){
    array_push($responseCountArray,$row);
  }
  return $responseCountArray;
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
  function insertPost($lecture_ID,$posted_by_ID, $text){
    $sql = "INSERT INTO Post (ID, lecture_ID, posted_by_ID, text, upvotes, time_posted)
    VALUES (NULL, '$lecture_ID', '$posted_by_ID', '$text', 0, CURRENT_TIMESTAMP)";
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
