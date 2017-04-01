<?php
  $lecture->PIN = 1234;
  $lecture->date = "2017-03-20";
  $lecture->time = "15:00:42";
  $lecture->responses = ["Slow down","Speed up", "Too hard","Too easy"];
  $lecture->subjectID = "TDT4125";
  $lecture->subject = "Algoritmekonstruksjon";

  $jsonLecture = json_encode($lecture);

  echo $jsonLecture;
?>
