<?php
require '../Database.php';
$db = new Database();
$assoc_array = $db->getLecturesByEmail("alg@dat.com");
echo $assoc_array;

/*foreach ($assoc_array as $ID => $array) {
  echo "$ID<br>";
  foreach ($array as $key => $value) {
    echo "$key : $value<br>";
  }
  echo "<br>";
}*/
?>
