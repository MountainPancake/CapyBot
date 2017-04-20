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
                listElement.id = subject;
                listElement.addEventListener("click", function() {
                    /*   Open correct subject when cliking on menu item    */
                    openSubject(this.id);
                });

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
                if (ingenFagDiv==null){return;}
                else {ingenFagDiv.appendChild(text);}
            }

            else {
                var subjects = document.getElementById("mySubjects");
                if (subjects==null){return;}
                else {
                    for (x in myObj) {
                        subject = myObj[x].name;

                        var ingenFagDiv = document.getElementById("ingenFagDiv");
                        ingenFagDiv.style.display = "none";

                        var listElement = document.createElement("li");
                        listElement.className = "subjectList";
                        var text = document.createTextNode(subject);
                        listElement.appendChild(text);
                        subjects.appendChild(listElement);
                    }
                }
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

/*    Gets lecturers subjects for drop down menu when creating lecture    */

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



/*    Add new subject in manageSubjects.html     */

function addSubject() {
    var categoryName = document.getElementById("chooseName").value;

    event.preventDefault();
    var dataString = 'categoryName=' + categoryName;

    $.ajax({
        type: "POST",
        url: "addSubject.php",
        data: dataString,
        success: function(text) {
            subjectSuccessful();
        },
        error: function(jqXHR, exception) {
            console.log(jqXHR);
        }

    });

}

/*    Help function for addSubject. Stays on the same page, even after subject has been added    */

function subjectSuccessful() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };

    getSubjects();
    var subjects = document.getElementById("subjectMenu");
    subjects.innerHTML = "";
    getMenu();

    xhttp.open("POST", "manageSubjects.html", true);
    xhttp.send();
}

/*   Open correct subject when cliking on menu item    */

function openSubject(subject) {

    console.log(subject);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;

            var header = document.getElementById("subjectName");
            header.innerHTML = subject;

            getLecturesForSubject(subject);
        }
    };

    xhttp.open("POST", "subject.html", true);
    xhttp.send();

}

/*   Subject.html -  Get all lectures for a given subject, for the signed in lecturer    */

function getLecturesForSubject(subject) {
    console.log(subject);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(JSON.parse(this.responseText));
            console.log(myObj);

            if (JSON.parse(this.responseText)=="null"){
                var noLecturesDiv = document.getElementById("noLecturesDiv");
                var text = document.createTextNode("You don't have any lectures for this subject yet! Create one below.")
                if (noLecturesDiv==null){return;}
                else {noLecturesDiv.appendChild(text);}
            }

            else {
                var lectures = document.getElementById("lecturesForSubject");
                if (lectures==null){return;}
                else {
                    for (x in myObj) {
                        lecture = myObj[x].name;

                        var noLecturesDiv = document.getElementById("noLecturesDiv");
                        noLecturesDiv.style.display = "none";

                        var listElement = document.createElement("li");
                        listElement.className = "lectureList";
                        var text = document.createTextNode(lecture);
                        listElement.appendChild(text);
                        lectures.appendChild(listElement);
                    }
                }
            }
        }
      };

    xhttp.open("POST", "getLecturesForSubject.php", true);
    xhttp.send("category="+subject);
}


/*   Inside subject-page, display/hide create lecture box    */

function viewCreateLectureBox() {
    var box = document.getElementById("addNewLectureBox");
    var button = document.getElementById("viewCreateLectureBoxButton");

    box.style.display = "block";
    button.style.display = "none";
}

function hideCreateLectureBox() {
    var box = document.getElementById("addNewLectureBox");
    var button = document.getElementById("viewCreateLectureBoxButton");
    var error = document.getElementById("lectureError");

    box.style.display = "none";
    button.style.display = "block";
    error.style.display = "none";

}

function newLectureCreated() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };

    //getLecturesForSubject();

    xhttp.open("POST", "subject.html", true);
    xhttp.send();
}

/*    Subject.html - New lecture created inside subject    */

function createNewLecture(){
    var category = document.getElementById("subjectName").innerHTML;
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
                newLectureCreated();
            },
            error: function(jqXHR, exception) {
                console.log(jqXHR);
            }

        });
    }
}
