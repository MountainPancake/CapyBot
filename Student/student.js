//Åpner siden Sign In
function openSignIn(){
    var activeSignIn = document.getElementById("activeSignIn");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeSignIn.className = "active";
    activeProfileNotLoggedIn.className = "";

    //Henter ut innholdet i "AJAXhtml/signIntoLecture.html" og legger det inn i "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "AJAXhtml/signIntoLecture.html", true);
    xhttp.send();
}


//Åpner siden ProfileNotLoggedIn og oppdaterer den onclick!
function openProfileNotLoggedIn() {
    var activeProfileNotLoggedIn = document.getElementById("activeProfileNotLoggedIn");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeProfileNotLoggedIn.className = "active";
    activeSignIn.className = "";

    //Henter ut innholdet i "AJAXhtml/profile.html" og legger det inn i "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
            updateProfile();
        }
    };
    xhttp.open("GET", "AJAXhtml/profile.html", true);
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

    //Henter ut innholdet i "AJAXhtml/student.html" og legger det inn i "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
            //Kaller oppdateringene fra database
            updateLecture();
            var orginFunction = "openLecture";
            insertPost(orginFunction);
        }
    };
    xhttp.open("GET", "AJAXhtml/student.html", true);
    xhttp.send();
}

function updateLecture(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          document.getElementById("subject").innerHTML = myObj.title;
          updateResponses();
      }
    };

    xmlhttp.open("GET", "PHP/getLecture.php?q=", true);
    xmlhttp.send();
}

function updateResponses(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);

          if(this.responseText=="[]"){
              document.getElementById("giveFeedbackHeader").style.display = "none";
          }

          else{
              var responsesDiv = document.getElementById("responsesDiv");
              var responses = document.getElementById("responses");

              for (x in myObj) {
                  response = myObj[x].text;

                  var button = document.createElement("button");
                  button.style.margin = "5px";
                  var text = document.createTextNode(response);

                  button.className = "btn btn-primary btn-lg";
                  button.appendChild(text);
                  button.id = myObj[x].lectureID;
                  responses.appendChild(button);

                  button.addEventListener("click", function(){
                      giveResponse(this.innerHTML);
                  });
              }

          }
      }
    };

    xmlhttp.open("GET", "PHP/getResponseButtons.php?q=", true);
    xmlhttp.send();
}

function giveResponse(text){
    //button.disabled = true;
    var dataString = "responseType=" + text;
    $.ajax({
        type: "POST",
        url: "PHP/insertResponse.php",
        data: dataString,
        success: function(responseText){
            console.log(responseText);
        },
        error: function(jqXHR, exception){
            console.log(jqXHR);
        }

    });

    addPoints(2);

}


//Åpner siden Profile og oppdaterer den onclick!
function openProfile() {
    var activeProfile = document.getElementById("activeProfile");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeProfile.className = "active" + "collapsed";
    activeLecture.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    //Henter ut innholdet i "AJAXhtml/profile.html" og legger det inn i "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
            //Kaller oppdateringene fra database
            updateProfile();
        }
    };
    xhttp.open("GET", "AJAXhtml/profile.html", true);
    xhttp.send();
}

function updateProfile(){

    //Henter ut innholdet i "PHP/getProfile.php", splitter det opp i variabler og legger det inn i forskjellige id-tagger
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          console.log(myObj);
          var username = myObj.email.split("@", 1);
          document.getElementById("name").innerHTML = username;
          document.getElementById("email").innerHTML = myObj.email;

          var orginFunction = "updateProfile";
          insertPoints(orginFunction);
      }
    };

    xmlhttp.open("GET", "PHP/getProfile.php?q=", true);
    xmlhttp.send();
}

//Kjører insertPost.php og sender deg videre til questions med input fra form
function postQuestion(){
    var questionData = document.getElementById("question").value;

    event.preventDefault();
    var dataString = "question=" + questionData;

    $.ajax({
        type: "POST",
        url: "PHP/insertPost.php",
        data: dataString,
        success: function(text){
            console.log(text);
            openQuestions();
        },
        error: function(jqXHR, exception){
            console.log(jqXHR);
        }
    });

    addPoints(5);

}

//Åpner siden Questions og oppdaterer den onclick!
function openQuestions(){
    var activeQuestions = document.getElementById("activeQuestions");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeQuestions.className = "active";
    activeProfile.className = "";
    activeLecture.className ="";
    activeHighscore.className = "";

    //Henter ut innholdet i "AJAXhtml/questions.html" og legger det inn i "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
            //Kaller oppdateringene fra database
            var orginFunction = "openQuestions";
            insertPost(orginFunction);
        }
    };
    xhttp.open("POST", "AJAXhtml/questions.html", true);
    xhttp.send();
}

//Viderefører til questions-siden til student, med nye spørsmål
function insertPost(orginFunction){
    var obj, dbParam, xmlhttp;
    // *** Grab the parent element just once, no need to keep looking it up in the loop
    obj = { "table":"text", "limit":15 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

          var myObj = JSON.parse(this.responseText);

          if(this.responseText=="[]"){
              document.getElementById("topQuest").innerHTML = "There are no questions yet!";
              document.getElementById("newQuest").innerHTML = "There are no questions yet!";
          }
          else{
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
                  +'<h5 class="upvotes"></h5>'
              +'</div>';

              if(myObj){
                  if(orginFunction === "openQuestions"){
                      Object.keys(myObj).forEach(function(key) {
                          var entry = myObj[key];
                          // Get the first .questbox and clone it
                          var clone = questBox.cloneNode(true);
                          // Set the question and upvotes
                          clone.querySelector(".question").innerHTML = entry.text;
                          clone.querySelector(".upvotes").innerHTML = entry.upvotes;

                          clone.querySelector(".knapp").setAttribute('name', entry.ID);

                          // Append the clone at the top
                          newQuest.appendChild(clone);

                      });
                  }
                  myObj.sort(function(a,b){
                      return parseInt(b.upvotes) - parseInt(a.upvotes);
                  });
                  myObj = myObj.slice(0,5);
                  var topQuest = document.getElementById("topQuest");
                  myObj.forEach(function(entry){
                      // Get the first .questbox and clone it
                      var clone = questBox.cloneNode(true);
                      // Set the question and upvotes
                      clone.querySelector(".question").innerHTML = entry.text;
                      clone.querySelector(".upvotes").innerHTML = entry.upvotes;

                      clone.querySelector(".knapp").setAttribute('name', entry.ID);
                      // Append the clone at the top
                      topQuest.appendChild(clone);
                  });
              }
          }
      }
    };
    xmlhttp.open("GET", "PHP/getPostsSortedByTime.php", true);
    xmlhttp.send();
}

//Oppdatere upvotes når knappene klikkes
function upvotePost(event){
    var button = event.srcElement;
    button.disabled = true;
    var dataString = "ID="+ button.getAttribute("name");
    $.ajax({
        type: "GET",
        url: "PHP/studentUpvote.php",
        data: dataString,
        success: function(responseText){
            var post = JSON.parse(responseText);
            button.parentElement.querySelector(".upvotes").innerHTML = post.upvotes;
        },
        error: function(jqXHR, exception){
            console.log(jqXHR);
        }

    });

    addPoints(2);

}



//Åpner siden Highscore og oppdaterer den onclick!
function openHighscore(){
    var activeHighscore = document.getElementById("activeHighscore");

    //setter klassen "active" aktiv hos gjeldene funksjon
    activeHighscore.className = "active";
    activeQuestions.className = "";
    activeProfile.className = "";
    activeLecture.className ="";

    //Henter ut innholdet i "AJAXhtml/highscore.html" og legger det inn i studentBody
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
            updateHighscore();
        }
    };
    xhttp.open("GET", "AJAXhtml/highscore.html", true);
    xhttp.send();

    //Kaller oppdateringene fra database
}

function updateHighscore(){

      //Henter ut innholdet i "PHP/getHighscore.php", splitter det opp og legger det inn i forskjellige id
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var highsoreTable = document.getElementById("highscoreTable");

            console.log(myObj);

            for (x in myObj){

                var email = myObj[x].email;
                var points = myObj[x].points;
                var name = email.split("@", 1);

                var row = document.createElement("TR");
                document.getElementById("tableRows").appendChild(row);

                var cell1 = document.createElement("TD");
                var cell2 = document.createElement("TD");

                var name = document.createTextNode(name);
                var points = document.createTextNode(points);

                cell1.appendChild(name);
                cell2.appendChild(points);

                row.appendChild(cell1);
                row.appendChild(cell2);

            }
        }
      };

      xmlhttp.open("GET", "PHP/getAllStudents.php", true);
      xmlhttp.send();
}


//Function for inserting points when submitting and upvoting questions and
//clicking on different responseButtons.
function insertPoints(orginFunction){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          if(orginFunction === "updateProfile"){
              document.getElementById("profilePoints").innerHTML = myObj.points + " nerdpoints";
          }
      }
    };

    xmlhttp.open("GET", "PHP/getProfile.php", true);
    xmlhttp.send();
}

function addPoints(points){
    var dataString = "points=" + points;
    $.ajax({
        type: "POST",
        url: "PHP/addPoints.php",
        data: dataString,
        success: function(responseText){
            console.log(responseText);
        },
        error: function(jqXHR, exception){
            console.log(jqXHR);
        }

    });

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
