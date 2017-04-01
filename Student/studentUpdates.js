function updateLecture(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          document.getElementById("pin").innerHTML = myObj.PIN;
          /*document.getElementById("dato").innerHTML = myObj.date;
          time = JSON.stringify(myObj.time);
          document.getElementById("time").innerHTML = myObj.time;*/

          document.getElementById("subject").innerHTML = myObj.subjectID + " " + myObj.subject;

          document.getElementById("slowDown").innerHTML = myObj.responses[0];
          document.getElementById("speedUp").innerHTML = myObj.responses[1];
          document.getElementById("tooHard").innerHTML = myObj.responses[2];
          document.getElementById("tooEasy").innerHTML = myObj.responses[3];
      }
    };

    xmlhttp.open("GET", "getLecture.php?q=", true);
    xmlhttp.send();
}

function updateProfile(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          document.getElementById("name").innerHTML = myObj.firstName + " " + myObj.lastName;
          document.getElementById("points").innerHTML = myObj.points;
          document.getElementById("rank").innerHTML = myObj.rank;
      }
    };

    xmlhttp.open("GET", "getProfile.php?q=", true);
    xmlhttp.send();
}

function updateQuestions(){}
