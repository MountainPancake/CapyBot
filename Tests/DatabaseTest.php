<?php
//Requires complete filepath from root, relative doesn't work
require '/Volumes/hzsvela/capybot/Database.php';

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
    $categories = array("eidsvoll","grunnlov");
    $date = "1814-05-17";
    $time = 140000;
    $title = "grunnlov";
    $insertedIDs = [];
    //Inserting new Lecture-rows
    foreach ($categories as $category) {
      $time += 2000;
      $isInserted = $this->db->insertLecture($lecturer_email,$category,$date,$time,$title);
      array_push($insertedIDs, mysqli_insert_id($this->db->con));
      $this->assertTrue($isInserted);
    }
    foreach ($insertedIDs as $ID) {
      $lecture = $this->db->getLectureByID($ID);
      $this->assertTrue(isset($lecture));
    }

    //Fetching Lectures or check existence
    $insertedLectures = $this->db->getLecturesByEmail($lecturer_email);
    $i = 0;
    //Asserting that correct info was inserted along with deleting the created lectures
    foreach ($insertedLectures as $lecture) {
      $this->assertTrue(in_array($lecture["category_name"],$categories));
      $this->assertEquals($date,$lecture["date"]);
      $i++;
      $lectureDeleted = $this->db->deleteLectureByID($lecture["ID"]);
      $this->assertTrue($lectureDeleted);
    }
  }

  public function testPostInsertReadUpvoteAndDelete(){
    $lectureID = 0;
    $postTexts = array("Tekst1","Tekst2");
    $insertedIDs = [];
    foreach ($postTexts as $text) {
      $inserted = $this->db->insertPost($lectureID,$text);
      $this->assertTrue($inserted);
      array_push($insertedIDs,mysqli_insert_id($this->db->con));
    }
    foreach ($insertedIDs as $ID) {
      $deleted = $this->db->deletePostByID($ID);
      $this->assertTrue($deleted);
    }


  }
}
