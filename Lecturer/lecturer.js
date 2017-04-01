/*   Gets all subjects for the lecturer logged in    */

function getSubjects() {
    /*  TO DO:

    When the body of the page loads, the given lecurers' subjects should appear in the left-side menu (id=subjects)

    */
}


/*    Changes main content when clicking on "create lecture" button    */

function createLecture() {

    var chooseSubject = document.getElementById("chooseSubject");

    /*  TO DO:

    Write code for getting the option values to go in "choose subject".
    Should be all the categories for the given lecturer

    BTW: <option selected="selected" disabled="disabled">Choose subject</option> needs to be the first option!!

    */

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "createLecture.html", true);
    xhttp.send();
}


/*    Shows additional form options after you have selected the subject of a lecture     */

function showContent(){
    var moreContent = document.getElementById("moreContent")

    moreContent.style.display = "block";

}
