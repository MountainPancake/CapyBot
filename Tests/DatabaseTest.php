<?php
require '../Database.php';

class DatabaseTest extends PHPUnit\Framework\TestCase
{
  private $db;

  protected function setUp(){
    $this->db = new Database();
  }

  public function testDisconnectAndConnect(){
    $isDisconnected = $this->db->disconnect();
    $this->assertTrue($isDisconnected);
    $isConnected = $this->db->connect();
    $this->assertTrue($isConnected);
  }

  public function testUserInsertReadAndDelete(){
    $email = "mail@fakemail.com";
    $password = "passord";
    $firstName = "Navnløs";
    $lastName = "Navløsesen";
    $university = "NTNU";
    $is_student = 0;
    $isInserted = $this->db->insertUser($email, $password, $firstName, $lastName, $university, $is_student);
    $insertedID = mysqli_insert_id($this->db->con);

    $this->assertTrue($isInserted);

    $insertedUser = $this->db->getUserByEmail($email);

    $this->assertEquals($insertedID,$insertedUser["ID"]);

    $isDeleted = $this->db->deleteUserByEmail($email);

    $this->assertTrue($isDeleted);
  }

  public function testLectureInsertReadAndDelete(){
    $lecturer_email = "mail@grunn.lov";
    $date = "1814-05-17";
    $categories = array("eidsvoll","grunnlov");
    $time = 140000;
    $title = "grunnlov pt.";
    $insertedIDs = [];
    //Inserting new Lecture-rows
    foreach ($categories as $category) {
      $time += 2000;
      $isInserted = $this->db->insertLecture($lecturer_email,$category,$date,$time,$title);
      array_push($insertedIDs, mysqli_insert_id($this->db->con));
      $this->assertTrue($isInserted);
    }
    //Fetching Lectures back ot check existence
    $insertedLectures = $this->db->getLecturesByEmail($lecturer_email),true;
    $i = 0;
    //Asserting that correct info was inserted along with deleting the created lectures
    foreach ($insertedLectures as $lecture) {
      $this->assertEquals($categories[$i],$lecture["category_name"]);
      $this->assertEquals($date,$lecture["date"]);
      $i++;
      $lectureDeleted = $this->db->deleteLectureByID($lecture["ID"]);
      $this->assertTrue($lectureDeleted);
    }
  }
}
