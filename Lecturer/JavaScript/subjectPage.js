/*  All JavaScript functions for subject pages    */

/*  Get all lectures for the given subject   */
function getLecturesForSubject(subject) {
    var noLecturesDiv = document.getElementById("noLecturesDiv");
    var lectures = document.getElementById("lecturesForSubject");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            /* If no lectures, create textbox that says so */
            if (this.responseText=="null"){
                var text = document.createTextNode("You don't have any lectures for this subject yet! Create one below.")
                noLecturesDiv.appendChild(text);
            }

            /* Else, create list element for each lecture, that should be clickable */
            else {
                for (x in myObj) {
                    lecture = myObj[x].title;
                    lectureDate = myObj[x].date;

                    noLecturesDiv.style.display = "none";

                    var listElement = document.createElement("li");
                    listElement.className = "lectureList";
                    listElement.id = x;
                    listElement.addEventListener("click", function() {
                        /*   Open correct lecture when cliking on lecture in menu   */
                        openLecture(myObj[this.id]);
                    });
                    var text = document.createTextNode(lecture + " - " + lectureDate);
                    listElement.appendChild(text);
                    lectures.appendChild(listElement);
                }
            }
        }
    };

    var postData = "category=" + subject + "&";
    xhttp.open("POST", "PHP_scripts/getLecturesForSubject.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(postData);
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


/*  function for creating new lecture inside a subject   */
function createNewLecture(){
    var category = document.getElementById("subjectName").innerHTML;
    var chooseName = document.getElementById("chooseName").value;
    var chooseDate = document.getElementById("chooseDate").value;
    var chooseTime = document.getElementById("chooseTime").value;

    var created = document.getElementById("lectureCreated");
    var error = document.getElementById("lectureError");

    /*    Check that input-values are valid using help functions and display text to let the user know if thet aren't    */
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
            url: "PHP_scripts/createLecture.php",
            data: dataString,
            success: function(text) {
                openSubject(category);
            },
            error: function(jqXHR, exception) {
                console.log(jqXHR);
            }
        });
    }
}
