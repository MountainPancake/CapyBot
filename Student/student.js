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

function openLecture(){
    var activeLecture = document.getElementById("activeLecture");

    activeLecture.className = "active";
    activeProfile.className = "";
    activeQuestions.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "student.html", true);
    xhttp.send();
}

function openProfile() {
    var activeProfile = document.getElementById("activeProfile");

    activeProfile.className = "active";
    activeLecture.className = "";
    activeQuestions.className = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "profile.html", true);
    xhttp.send();
}

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

function openQuestions(){
    var activeQuestions = document.getElementById("activeQuestions");

    activeQuestions.className = "active";
    activeProfile.className = "";
    activeLecture.className ="";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("student_body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "questions.html", true);
    xhttp.send();
}
