/*  All JavaScript functions for the manage subjects page    */


/*  Inside manage subjects, fill out the box with all the subjects for the gíven lecturer    */
function getSubjects() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            /* If no subjects, create text box saying so */
            if (this.responseText=="[]"){
                var ingenFagDiv = document.getElementById("ingenFagDiv");
                var text = document.createTextNode("You don't have any subjects yet! Create one below.")
                if (ingenFagDiv==null){return;}
                else {ingenFagDiv.appendChild(text);}
            }

            else {
                var subjects = document.getElementById("mySubjects");

                    /* For each subject, create list element that will display in box */
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
      };

    xhttp.open("POST", "PHP_scripts/getSubjects.php", true);
    xhttp.send();
}


/*  Add new subject  */
function addSubject() {
    var categoryName = document.getElementById("chooseName").value;

    event.preventDefault();
    var dataString = 'categoryName=' + categoryName;

    $.ajax({
        type: "POST",
        url: "PHP_scripts/addSubject.php",
        data: dataString,
        success: function(text) {
            subjectSuccessful();
        },
        error: function(jqXHR, exception) {
            console.log(jqXHR);
        }
    });
}


/*    Help function for addSubject. Stay on the same page even after subject has been added    */
function subjectSuccessful() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };

    /* get subjects again so that the new subject also appear in menu inside manage subject */
    getSubjects();

    /* Update main side menu as well to add new subject */
    var subjects = document.getElementById("subjectMenu");
    subjects.innerHTML = "";
    getMenu();

    xhttp.open("POST", "AJAX_files/manageSubjects.html", true);
    xhttp.send();
}
