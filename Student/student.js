//Åpner siden Sign In
function openSignIn(){
    var activeSignIn = document.getElementById("activeSignIn");

    activeSignIn.className = "active";
    activeProfile_notLoggedIn.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "student_notLoggedIn.html", true);
    xhttp.send();
}



//Åpner siden Lecture og oppdaterer den onclick!
function openLecture(){
    var activeLecture = document.getElementById("activeLecture");

    activeLecture.className = "active";
    activeProfile.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "student.html", true);
    xhttp.send();

    //Kaller oppdateringene
    updateLecture();
}

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



//Åpner siden Profile og oppdaterer den onclick!
function openProfile() {
    var activeProfile = document.getElementById("activeProfile");

    activeProfile.className = "active" + "collapsed";
    activeLecture.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "profile.html", true);
    xhttp.send();

    //Kaller oppdateringene
    updateProfile();
}

function updateProfile(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          document.getElementById("name").innerHTML = myObj.firstName + " " + myObj.lastName;
          document.getElementById("points").innerHTML = myObj.points + " nerdpoints";
          document.getElementById("rank").innerHTML = myObj.rank;
      }
    };

    xmlhttp.open("GET", "getProfile.php?q=", true);
    xmlhttp.send();
}



//Åpner siden Profile_notLoggedIn og oppdaterer den onclick!
function openProfile_notLoggedIn() {
    var activeProfile_notLoggedIn = document.getElementById("activeProfile_notLoggedIn");

    activeProfile_notLoggedIn.className = "active";
    activeSignIn.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "profile.html", true);
    xhttp.send();
}




//Åpner siden Questions og oppdaterer den onclick!
function openQuestions(){
    var activeQuestions = document.getElementById("activeQuestions");

    activeQuestions.className = "active";
    activeProfile.className = "";
    activeLecture.className ="";
    activeHighscore.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "questions.html", true);
    xhttp.send();

    //Kaller oppdateringene
    updateQuestions();
}

function updateQuestions(){

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            document.getElementById("question").innerHTML = myObj.question;
        }
      };

      xmlhttp.open("GET", "getQuestions.php?q=", true);
      xmlhttp.send();
}

//Åpner siden Highscore og oppdaterer den onclick!
function openHighscore(){
    var activeHighscore = document.getElementById("activeHighscore");

    activeHighscore.className = "active";
    activeQuestions.className = "";
    activeProfile.className = "";
    activeLecture.className ="";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "highscore.html", true);
    xhttp.send();

    //Kaller oppdateringene
    //updateHighscore();
}
/*
function updateHighscore(){

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            document.getElementById("highscore").innerHTML = myObj.question;
        }
      };

      xmlhttp.open("GET", "getHighscore.php?q=", true);
      xmlhttp.send();
}*/
