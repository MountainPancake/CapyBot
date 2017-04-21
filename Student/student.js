//Åpner siden Sign In
function openSignIn(){
    var activeSignIn = document.getElementById("activeSignIn");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeSignIn.className = "active";
    activeProfile_notLoggedIn.className = "";

    //Henter ut innholdet i "student_notLoggedIn.html" og legger det inn i "student_body"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "student_notLoggedIn.html", true);
    xhttp.send();
}


//Åpner siden Profile_notLoggedIn og oppdaterer den onclick!
function openProfile_notLoggedIn() {
    var activeProfile_notLoggedIn = document.getElementById("activeProfile_notLoggedIn");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeProfile_notLoggedIn.className = "active";
    activeSignIn.className = "";

    //Henter ut innholdet i "profile.html" og legger det inn i "student_body"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "profile.html", true);
    xhttp.send();
}


//Åpner siden Lecture og oppdaterer den onclick!
function openLecture(){
    var activeLecture = document.getElementById("activeLecture");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeLecture.className = "active";
    activeProfile.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    //Henter ut innholdet i "student.html" og legger det inn i "student_body"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
            //Kaller oppdateringene fra database
            updateLecture();
        }
    };
    xhttp.open("GET", "student.html", true);
    xhttp.send();
}

function updateLecture(){

    //Synliggjøre/gjemme question-box ut i fra om lecturer har stillt spørsmål eller ikke
    /*if(){
        $("#lecturer_quest").hide();
    }*/

    //Henter ut innholdet i "getLecture.php", splitter det opp i variabler og legger det inn i forskjellige id-tagger
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          document.getElementById("subject").innerHTML = myObj.name;
          document.getElementById("slowDown").innerHTML = myObj.responses[0];
          document.getElementById("speedUp").innerHTML = myObj.responses[1];
          document.getElementById("tooHard").innerHTML = myObj.responses[2];
          document.getElementById("tooEasy").innerHTML = myObj.responses[3];
      }
    };

    xmlhttp.open("GET", "getLecture.php", true);
    xmlhttp.send();
}



//Åpner siden Profile og oppdaterer den onclick!
function openProfile() {
    var activeProfile = document.getElementById("activeProfile");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeProfile.className = "active" + "collapsed";
    activeLecture.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    //Henter ut innholdet i "profile.html" og legger det inn i "student_body"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
            //Kaller oppdateringene fra database
            updateProfile();
        }
    };
    xhttp.open("GET", "profile.html", true);
    xhttp.send();
}

function updateProfile(){

    //Henter ut innholdet i "getProfile.php", splitter det opp i variabler og legger det inn i forskjellige id-tagger
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          document.getElementById("name").innerHTML = myObj.first_name + " " + myObj.last_nme;
          //document.getElementById("points").innerHTML = myObj.points + " nerdpoints";
          //document.getElementById("rank").innerHTML = myObj.rank;
      }
    };

    xmlhttp.open("GET", "getProfile.php?q=", true);
    xmlhttp.send();
}

//Kjører insertPost.php og sender deg videre til questions med input fra form
function postQuestion(){
    var questionData = document.getElementById("question").value;

    event.preventDefault();
    var dataString = "question=" + questionData;

    $.ajax({
        type: "POST",
        url: "insertPost.php",
        data: dataString,
        success: function(text){
            console.log(text);
            openQuestions();
        },
        error: function(jqXHR, exception){
            console.log(jqXHR);
        }
    });
}

//Åpner siden Questions og oppdaterer den onclick!
function openQuestions(){
    var activeQuestions = document.getElementById("activeQuestions");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeQuestions.className = "active";
    activeProfile.className = "";
    activeLecture.className ="";
    activeHighscore.className = "";

    //Henter ut innholdet i "questions.html" og legger det inn i "student_body"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
            //Kaller oppdateringene fra database
            insertPost();
        }
    };
    xhttp.open("POST", "questions.html", true);
    xhttp.send();
}

//Viderefører til questions-siden til student, med nye spørsmål
function insertPost(){
    var obj, dbParam, xmlhttp;
    // *** Grab the parent element just once, no need to keep looking it up in the loop
    obj = { "table":"text", "limit":15 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var questBox = document.createElement("div");
          questBox.className = "questbox";
          questBox.innerHTML =
          '<div class="quest">'
              +'<h5 class="question"></h5>'
          +'</div>'
          +'<div class="up-vote">'
              +'<button type="button"onclick="upvotePost(event)"  class="btn btn-lg btn-primary knapp">'
                  +'<div class="arrow-up"/>'
              +'</button>'
              +'<h5" class="upvotes"></h5>'
          +'</div>';
          var myObj = JSON.parse(this.responseText);
          if(myObj){
              var new_quest = document.getElementById("new_quest");
              Object.keys(myObj).forEach(function(key) {
                  var entry = myObj[key];
                  // Get the first .questbox and clone it
                  var clone = questBox.cloneNode(true);
                  // Set the question and upvotes
                  clone.querySelector(".question").innerHTML = entry.text;
                  clone.querySelector(".upvotes").innerHTML = entry.upvotes;

                  clone.querySelector(".upvotes").setAttribute('name', entry.upvotes);
                  clone.querySelector(".knapp").setAttribute('name', entry.ID);

                  // Append the clone at the top
                  new_quest.appendChild(clone);

              });
              myObj.sort(function(a,b){
                  return parseInt(b.upvotes) - parseInt(a.upvotes);
              });
              myObj = myObj.slice(0,5);
              var top_quest = document.getElementById("top_quest");
              myObj.forEach(function(entry){
                  // Get the first .questbox and clone it
                  var clone = questBox.cloneNode(true);
                  // Set the question and upvotes
                  clone.querySelector(".question").innerHTML = entry.text;
                  clone.querySelector(".upvotes").innerHTML = entry.upvotes;
                  clone.querySelector(".knapp").setAttribute('name', entry.ID);
                  // Append the clone at the top
                  top_quest.appendChild(clone);
              });
          }
      }
    };
    xmlhttp.open("GET", "getPostsSortedByTime.php", true);
    xmlhttp.send();
}

//Oppdatere upvotes når knappene klikkes
function upvotePost(event){
    var button = event.srcElement;
    button.disabled = true;
    var dataString = "ID="+ button.getAttribute("name");
    $.ajax({
        type: "GET",
        url: "studentUpvote.php",
        data: dataString,
        success: function(responseText){
            //insertPost();
            var post = JSON.parse(responseText);
            button.parentElement.querySelector(".upvotes").innerHTML = post.upvotes;
        },
        error: function(jqXHR, exception){
            console.log(jqXHR);
        }

    });
}



//Åpner siden Highscore og oppdaterer den onclick!
function openHighscore(){
    var activeHighscore = document.getElementById("activeHighscore");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeHighscore.className = "active";
    activeQuestions.className = "";
    activeProfile.className = "";
    activeLecture.className ="";

    //Henter ut innholdet i "highscore.html" og legger det inn i student_body
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "highscore.html", true);
    xhttp.send();

    //Kaller oppdateringene fra database
    updateHighscore();

    function updateHighscore(){

          //Henter ut innholdet i "getHighscore.php", splitter det opp og legger det inn i forskjellige id
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                document.getElementById("place").innerHTML = myObj.place;
                document.getElementById("nickname").innerHTML = myObj.nickname;
                document.getElementById("points").innerHTML = myObj.points;
            }
          };

          xmlhttp.open("GET", "getHighscore.php?q=", true);
          xmlhttp.send();
    }
}



//Kollapser Navigationbar når man klikker på linkene i menyen
collapseNavbar();
function collapseNavbar(){

    //Gjemmer og viser menyen igjen ettersom hvor man klikker
    $(window).on("click", function(){
        $("#navbar").on("click", function(){
            $("#navbar").collapse('hide');
        });
        $("#dropdown-menu").on("click", function(){
            $("#navbar").collapse('toggle');
        });
    });

}
