
/* Login function */
function lecturerLogin(){
  event.preventDefault();
  var dataString = "email="+document.getElementById("email").value+"&password="+document.getElementById("password").value;

  $.ajax({
      type: "POST",
      url: "lecturerLogin.php",
      data: dataString,
      success: function(text) {
        if(text == "success"){
          location.href = "loggedIn.html";
        }else{
          alert("Login failed.\nEmail and/or password incorrect.")
        }
      },
      error: function(jqXHR, exception) {
          console.log(jqXHR);
      }
  });
}

/*   Get subjects for menu    */
function getMenu() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(JSON.parse(this.responseText));

            var subjects = document.getElementById("subjectMenu");

            for (x in myObj) {
                subject = myObj[x].name;

                var listElement = document.createElement("li");
                listElement.className = "menuSubject";
                var text = document.createTextNode(subject);
                listElement.appendChild(text);
                subjects.appendChild(listElement);
            }
        }
      };

    xhttp.open("POST", "getSubjects.php", true);
    xhttp.send();

}

/*    Switches main body content using AJAX from the overview.html file    */

function overview() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "overview.html", true);
    xhttp.send();
}

/*    Switches main body content using AJAX from the manageSubjects.html file    */

function manageSubjects() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };

    getSubjects();   /* Gets already added subjects to the manage subjects page   */

    xhttp.open("POST", "manageSubjects.html", true);
    xhttp.send();
}

/*   Gets all subjects for the lecturer logged in    */

function getSubjects() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(JSON.parse(this.responseText));

            if (JSON.parse(this.responseText)=="null"){
                var ingenFagDiv = document.getElementById("ingenFagDiv");
                var text = document.createTextNode("You don't have any subjects yet! Create one below.")
                ingenFagDiv.appendChild(text);
            }

            var subjects = document.getElementById("mySubjects");

            for (x in myObj) {
                subject = myObj[x].name;

                var ingenFagDiv = document.getElementById("ingenFagDiv");
                ingenFagDiv.style.display = none;

                var listElement = document.createElement("li");
                listElement.className = "subjectList";
                var text = document.createTextNode(subject);
                listElement.appendChild(text);
                subjects.appendChild(listElement);
            }
        }
      };

    xhttp.open("POST", "getSubjects.php", true);
    xhttp.send();

}

/*    Switches main body content using AJAX from the statistics.html file    */

function statistics() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "statistics.html", true);
    xhttp.send();
}


/*    Changes main content when clicking on "create lecture" button    */

function createLecture() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };

    getDropDown();

    xhttp.open("POST", "createLecture.html", true);
    xhttp.send();
}

function getDropDown() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(JSON.parse(this.responseText));

            var chooseSubject = document.getElementById("chooseSubject");

            for (x in myObj) {
                subject = myObj[x].name;
                var optionElement = document.createElement("option");
                optionElement.text = subject;
                chooseSubject.appendChild(optionElement);
            }
        }
      };

    xhttp.open("POST", "getSubjects.php", true);
    xhttp.send();
}


/*    Shows additional form options after you have selected the subject of a lecture     */

function showContent(){
    var moreContent = document.getElementById("moreContent")

    moreContent.style.display = "block";

}


/*    What happens when you click the "save" button when creating a new lecture    */

function addLecture(){
    var category = document.getElementById("chooseSubject").value;
    var chooseName = document.getElementById("chooseName").value;
    var chooseDate = document.getElementById("chooseDate").value;
    var chooseTime = document.getElementById("chooseTime").value;

    var created = document.getElementById("lectureCreated");
    var error = document.getElementById("lectureError");

    /*    Check that input-values are valid    */

    if (validTitle(chooseName)==false) {
        error.style.display = "block";
        error.innerHTML = "Lecture not created. You need to choose a title for you lecture.";
        return false;
    }

    if (validDate(chooseDate)==false) {
        error.style.display = "block";
        error.innerHTML = "Lecture not created. The date is not valid.";
        return false;
    }

    if (validTime(chooseTime)==false) {
        error.style.display = "block";
        error.innerHTML = "Lecture not created. The time is not valid.";
        return false;
    }

    /*    If they are valid, run create lecture PHP-script   */

    else {
        event.preventDefault();
        var dataString = 'category=' + category + '&name=' + chooseName + '&date=' + chooseDate + '&time=' + chooseTime;

        $.ajax({
            type: "POST",
            url: "createLecture.php",
            data: dataString,
            success: function(text) {
                lectureSuccessful();
            },
            error: function(jqXHR, exception) {
                console.log(jqXHR);
            }

        });
    }

}


/*    Switching pages when a lecture is created successfully     */

function lectureSuccessful() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "lectureCreated.html", true);
    xhttp.send();
}



/*    Checking that values are legal when creating a lecture     */

function validTitle(name) {
    if (name == "") {
        return false;
    }
    else {return true;}
}

function validDate(date) {
    if (date.length != 10) {
        return false;
    }
    else {return true;}
}

function validTime(time) {
    if (time.length != 5) {
        return false;
    }
    else {return true;}
}
