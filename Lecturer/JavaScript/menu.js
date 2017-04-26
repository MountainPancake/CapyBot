/* All functions for top and left-side menus. Used in loggedIn.html */


/* Log out function for top menu */
function signOut(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            /* Redirects to lecturer index after signing out */
            window.location.href = "AJAX_files/lecturerIndex.html"
        }
    };
    xhttp.open("POST", "PHP_scripts/logOut.php", true);
    xhttp.send();
}


/*   Gets email for the email-field in the top menu   */
function getEmail() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var email = document.getElementById("email");
            email.innerHTML = myObj;
        }
    };

    xhttp.open("POST", "PHP_scripts/getEmail.php", true);
    xhttp.send();
}


/*   Get subjects for menu for the given lecturer signed in    */
function getMenu() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            myObj = JSON.parse(this.responseText);

            var subjects = document.getElementById("subjectMenu");

            for (x in myObj) {
                subject = myObj[x].name;

                var listElement = document.createElement("li");
                listElement.className = "menuSubject";
                listElement.id = subject;

                /*   For each subject, add click event-listener that will open correct subject when cliked    */
                listElement.addEventListener("click", function() {
                    /*  Open subject that was clicked (lecturer.js)  */
                    openSubject(this.id);
                });

                var text = document.createTextNode(subject);
                listElement.appendChild(text);
                subjects.appendChild(listElement);
            }
        }
    };

    xhttp.open("POST", "PHP_scripts/getSubjects.php", true);
    xhttp.send();

}



/*   Overview menu item -  Switches main body content using AJAX from the overview.html file    */
function overview() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "AJAX_files/overview.html", true);
    xhttp.send();
}


/*  Manage subject menu item -  Switches main body content using AJAX from the manageSubjects.html file    */
function manageSubjects() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };

    /* Inside subjects-box in manage subjects, get all subjects for given lecturer   */
    getSubjects();

    xhttp.open("POST", "AJAX_files/manageSubjects.html", true);
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

    /*  Inside create lecture there is a subject-drop-down that needs to be filled out when create lecture is opened   */
    getDropDown();

    xhttp.open("POST", "AJAX_files/createLecture.html", true);
    xhttp.send();
}


/*   Each subject in the menu should open that subject-page    */
function openSubject(subject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;

            var header = document.getElementById("subjectName");
            header.innerHTML = subject;

            /* When that subject page is opened, the lectures for the subject should appear in the lecture-menu-box */
            getLecturesForSubject(subject);

        }
    };

    xhttp.open("POST", "AJAX_files/subject.html", true);
    xhttp.send();

}
