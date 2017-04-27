//Opens the site signIntoLecture
function openSignIn(){
    var activeSignIn = document.getElementById("activeSignIn");

    //Set the right class to the class "active"
    activeSignIn.className = "active";
    activeProfileNotLoggedIn.className = "";

    //Fetches the "AJAXhtml/signIntoLecture.html" file and og insert it into "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "AJAXhtml/signIntoLecture.html", true);
    xhttp.send();
}


//Opens the site ProfileNotLoggedIn
function openProfileNotLoggedIn() {
    var activeProfileNotLoggedIn = document.getElementById("activeProfileNotLoggedIn");

    //Set the right class to the class "active"
    activeProfileNotLoggedIn.className = "active";
    activeSignIn.className = "";

    //Fetches the "AJAXhtml/profile.html" file and og insert it into "studentBody"
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


//Opens the site Lecture
function openLecture(){
    var activeLecture = document.getElementById("activeLecture");

    //Set the right class to the class "active"
    activeLecture.className = "active";
    activeProfile.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    //Fetches the "AJAXhtml/student.html" file and og insert it into "studentBody"

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;

            //Calling functions thats needed to update data displayd from database
            updateLecture();
            var orginFunction = "openLecture";
            insertPost(orginFunction);
        }
    };
    xhttp.open("GET", "AJAXhtml/lecture.html", true);
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


//Updates what responses to display on site
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

//Update database with new count of responses given.
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


//Opens the site Profile
function openProfile() {
    var activeProfile = document.getElementById("activeProfile");

    //Set the right class to the class "active"
    activeProfile.className = "active" + "collapsed";
    activeLecture.className = "";
    activeQuestions.className = "";
    activeHighscore.className = "";

    //Fetches the "AJAXhtml/profile.html" file and og insert it into "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;

            //Calling function thats needed to update data displayd from database
            updateProfile();
        }
    };
    xhttp.open("GET", "AJAXhtml/profile.html", true);
    xhttp.send();
}

//Fetches data from "PHP/getProfile.php"
function updateProfile(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          var username = myObj.email.split("@", 1);

          document.getElementById("name").innerHTML = username;
          document.getElementById("email").innerHTML = myObj.email;

          //Calling function thats needed to update data displayd from database
          var orginFunction = "updateProfile";
          insertPoints(orginFunction);
      }
    };

    xmlhttp.open("GET", "PHP/getProfile.php?q=", true);
    xmlhttp.send();
}

//Inserting post and sends you to the site questions.
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

//Opens the site Questions
function openQuestions(){
    var activeQuestions = document.getElementById("activeQuestions");

    //Set the right class to the class "active"
    activeQuestions.className = "active";
    activeProfile.className = "";
    activeLecture.className ="";
    activeHighscore.className = "";

    //Fetches the "AJAXhtml/questions.html" file and og insert it into "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("studentBody").innerHTML = this.responseText;

            //Calling function thats needed to update data displayd from database
            var orginFunction = "openQuestions";
            insertPost(orginFunction);
        }
    };
    xhttp.open("POST", "AJAXhtml/questions.html", true);
    xhttp.send();
}

//Insering questions at the question site
function insertPost(orginFunction){
    var obj, dbParam, xmlhttp;
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
                          var clone = questBox.cloneNode(true);

                          clone.querySelector(".question").innerHTML = entry.text;
                          clone.querySelector(".upvotes").innerHTML = entry.upvotes;
                          clone.querySelector(".knapp").setAttribute('name', entry.ID);

                          newQuest.appendChild(clone);

                      });
                  }

                  myObj.sort(function(a,b){
                      return parseInt(b.upvotes) - parseInt(a.upvotes);
                  });

                  myObj = myObj.slice(0,5);
                  var topQuest = document.getElementById("topQuest");

                  myObj.forEach(function(entry){

                      var clone = questBox.cloneNode(true);

                      clone.querySelector(".question").innerHTML = entry.text;
                      clone.querySelector(".upvotes").innerHTML = entry.upvotes;

                      clone.querySelector(".knapp").setAttribute('name', entry.ID);
                      topQuest.appendChild(clone);

                  });
              }
          }
      }
    };
    xmlhttp.open("GET", "PHP/getPostsSortedByTime.php", true);
    xmlhttp.send();
}

//Update the upvote count on posts
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


//Opens the site  Highscore
function openHighscore(){
    var activeHighscore = document.getElementById("activeHighscore");

    ///Set the right class to the class "active"
    activeHighscore.className = "active";
    activeQuestions.className = "";
    activeProfile.className = "";
    activeLecture.className ="";

    //Fetches the "AJAXhtml/highscore.html" file and og insert it into "studentBody"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("studentBody").innerHTML = this.responseText;

            //Calling function thats needed to update data displayd from database
            updateHighscore();
        }
    };
    xhttp.open("GET", "AJAXhtml/highscore.html", true);
    xhttp.send();

}

//Fetches data from "PHP/getHighscore.php" and displays it in a table
function updateHighscore(){

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var highsoreTable = document.getElementById("highscoreTable");

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

//Insert the updatet points in database.
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


//Collapses Navigationbar when clicking linke in the menu
collapseNavbar();
function collapseNavbar(){

    $(window).on("click", function(){
        $("#navbar").on("click", function(){
            $("#navbar").collapse('hide');
        });
        $("#dropdown-menu").on("click", function(){
            $("#navbar").collapse('toggle');
        });
    });

}
