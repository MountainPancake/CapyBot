<html>
<?php
$servername = "mysql.stud.ntnu.no";
$username = "capybotpu";
$password = "1234";
$dbname = "capybotpu_db";
// Create connection
$con = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}else{
  echo "Connected very successfully<br>";
}

echo "Helluuuuu<br>";
$query = "SELECT * FROM User";
echo "Helluuuuu<br>";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_row($result);
echo "Helluuuuu<br>";
echo "This person is a ".(!$row[3]?"student":"lecturer");

?>
</html>
