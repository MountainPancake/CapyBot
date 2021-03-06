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
    $is_disconnected = $this->db->disconnect();
    $this->assertTrue($is_disconnected);
    $is_connected = $this->db->connect();
    $this->assertTrue($is_connected);
  }

  public function testUserInsertUpdateReadAndDelete(){
    $email = "mail@fakemail.com";
    $password = "passord";
    $first_name = "Navnløs";
    $last_name = "Navløsesen";
    $university = "NTNU";
    $is_student = 0;
    $points_added = 5;
    $is_inserted = $this->db->insertUser($email, $password, $first_name, $last_name, $university, $is_student);
    $inserted_ID = mysqli_insert_id($this->db->con);
    //Asserting that user was inserted
    $this->assertTrue($is_inserted);
    //Asserting that inserted user ID is correct
    $inserted_user = $this->db->getUserByEmail($email);
    $this->assertEquals($inserted_ID,$inserted_user["ID"]);
    //Adding points to user and asserting that new total is correct
    $this->db->addPointsByUserEmail($email,$points_added);
    $old_points_total = $inserted_user["points"];
    $new_points_total = $this->db->getUserByEmail($email)["points"];
    $this->assertEquals($old_points_total+$points_added,$new_points_total);

    $is_deleted = $this->db->deleteUserByEmail($email);
    $this->assertTrue($is_deleted);
  }

  public function testCategoriesInsertReadAndDelete(){
    $lecturer_email = "categoriestestmail@test.te";
    $categories_name = array("cats", "dogs", "capybaras", "something");
    foreach ($categories_name as $c_name){
      $inserted = $this->db->insertCategory($c_name, $lecturer_email);
      $this->assertTrue($inserted);
    }
    $insertedCategories = $this->db->getCategoriesByEmail($lecturer_email);

    //Asserting that correct info was inserted
    foreach ($insertedCategories as $c) {
      $this->assertTrue(in_array($c["name"], $categories_name));
      $this->assertEquals($lecturer_email,$c["lecturer_email"]);
      $deleted = $this->db->deleteCategoryByNameAndEmail($c["name"], $c["lecturer_email"]);
      $this->assertTrue($deleted);
    }
  }

  public function testLectureInsertReadAndDelete(){
    $lecturer_email = "mail@grunn.lov";
    $categories = array("eidsvoll","grunnlov");
    $date = "1814-05-17";
    $time = 140000;
    $title = "grunnlov";
    $inserted_IDs = [];
    //Inserting new Lecture-rows
    foreach ($categories as $category) {
      $time += 2000;
      $is_inserted = $this->db->insertLecture($lecturer_email,$category,$date,$time,$title);
      array_push($inserted_IDs, mysqli_insert_id($this->db->con));
      $this->assertTrue($is_inserted);
    }
    foreach ($inserted_IDs as $ID) {
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
    $posted_by_ID = 40;
    $postTexts = array("Tekst1","Tekst2");
    foreach ($postTexts as $text) {
      $inserted = $this->db->insertPost($lectureID,$posted_by_ID,$text);
      $this->assertTrue($inserted);
    }
    //Checking existence of inserted posts, upvoting them and deleting
    $insertedPosts = $this->db->getPostsByLectureID($lectureID);
    foreach ($insertedPosts as $post) {
      $upvotes = $post["upvotes"];
      $this->db->upvotePostByID($post["ID"]);
      //Checking if new upvote-value is 1 higher than previous
      $updatedPost = $this->db->getPostByID($post["ID"]);
      $this->assertEquals($upvotes+1,$updatedPost["upvotes"]);
      $this->assertEquals($posted_by_ID,$updatedPost["posted_by_ID"]);
      //Delete post
      $deleted = $this->db->deletePostByID($post["ID"]);
      $this->assertTrue($deleted);
    }
  }

  public function testResponseTypeInsertReadAndDelete(){
    $lectureID = 0;
    $texts = array("Too slow","Too fast", "Too flippin complicated bruv");
    foreach ($texts as $text) {
      $inserted = $this->db->insertResponseType($lectureID,$text);
      $this->assertTrue($inserted);
    }
    $insertedResponseTypes = $this->db->getResponseTypesByLectureID($lectureID);
    foreach ($insertedResponseTypes as $responseType) {
      $this->assertTrue(in_array($responseType["text"],$texts));
      $deleted = $this->db->deleteResponseTypeByLectureIDAndText($lectureID,$responseType["text"]);
      $this->assertTrue($deleted);
    }
  }

  public function testResponseInsertCountAndDelete(){
    $lectureID = 0;
    $responses = ["Too slow" => 5, "Too fast" => 2,"Too flippin complicated bruv" => 100];
    foreach ($responses as $responseType => $count) {
      for($i = 0; $i < $count; $i++){
        $this->db->insertResponse($lectureID,$responseType);
      }
      $actualCount = $this->db->getResponseCount($lectureID,$responseType);
      $this->assertEquals($count,$actualCount);
    }
    $responseCountArray = $this->db->getResponseTypesAndCountByLectureID($lectureID);
    $this->assertEquals(sizeof($responses),sizeof($responseCountArray));

    $deleted = $this->db->deleteAllResponsesByLectureID($lectureID);
    $this->assertTrue($deleted);

  }
}
