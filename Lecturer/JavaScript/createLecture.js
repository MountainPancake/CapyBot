/*  All JavaScript functions for create subject in menu    */


/*    Gets lecturers subjects for drop down menu when creating lecture    */
function getDropDown() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var chooseSubject = document.getElementById("chooseSubject");

            /* For each subject create a new drop down option */
            for (x in myObj) {
                subject = myObj[x].name;
                var optionElement = document.createElement("option");
                optionElement.text = subject;
                chooseSubject.appendChild(optionElement);
            }
        }
      };
    xhttp.open("POST", "PHP_scripts/getSubjects.php", true);
    xhttp.send();
}


/*    Gets additional fields after picking a subject     */
function showContent(){
    var moreContent = document.getElementById("moreContent")
    moreContent.style.display = "block";
}


/*    Add lecture after filling out all fields    */
function addLecture(){
    var category = document.getElementById("chooseSubject").value;
    var chooseName = document.getElementById("chooseName").value;
    var chooseDate = document.getElementById("chooseDate").value;
    var chooseTime = document.getElementById("chooseTime").value;

    var created = document.getElementById("lectureCreated");
    var error = document.getElementById("lectureError");

    /*    Check that input-values are valid using help functions   */
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

    /*  If they are valid, run create lecture PHP-script   */
    else {
        event.preventDefault();
        var dataString = 'category=' + category + '&name=' + chooseName + '&date=' + chooseDate + '&time=' + chooseTime;

        $.ajax({
            type: "POST",
            url: "PHP_scripts/createLecture.php",
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

/*    When lecture is created, switch to the confirm page.    */
function lectureSuccessful() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "AJAX_files/lectureCreated.html", true);
    xhttp.send();
}


/*    Help functions to validate that title, date and time is vald.    */
function validTitle(name) {
    if (name == "") {return false;}
    else {return true;}
}
function validDate(date) {
    if (date.length != 10) {return false;}
    else {return true;}
}
function validTime(time) {
    if (time.length != 5) {return false;}
    else {return true;}
}
