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


/*    What happens when you click the "save" button when creating a new lecture    */

function addLecture(){
    var chooseName = document.getElementById("chooseName");
    var chooseDate = document.getElementById("chooseDate");
    var chooseTime = document.getElementById("chooseTime");

    var created = document.getElementById("lectureCreated");
    var error = document.getElementById("lectureError");

    /*    Check that input-values are valid    */

    if (validTitle(chooseName.value==false)) {
        error.style.display = "block";
        error.innerHTML = "Lecture not created. You need to choose a title for you lecture.";
        return false;
    }

    else if (validDate(chooseDate.value==false)) {
        error.style.display = "block";
        error.innerHTML = "Lecture not created. The date is not valid.";
        return false;
    }

    else if (validTime(chooseTime.value==false)) {
        error.style.display = "block";
        error.innerHTML = "Lecture not created. The time is not valid.";
        return false;
    }

    /*    If they are valid, run create lecture PHP-file   */

    else {
        var category = $('#category').val();
        var name = $('#name').val();
        var date = $('#date').val();
        var time = $('#time').val();

        var dataString = 'category=' + category + 'name=' + name + '&date=' + date + '&time=' + time;

        $.ajax({
            type: "POST",
            url: "createLecture.php",
            data: dataString,
            success: function() {
                alert('');
                $('#dialog-message').dialog('open');
    }

}

/*    Checking that values are legal when creating a lecture     */

function validTitle(name) {
    if (name == "") {
        return false;
    }
    else {return true;}
}

function validDate(date) {
    if (name == "") {
        return false;
    }
    else {return true;}
}

function validTime(time) {
    if (name == "") {
        return false;
    }
    else {return true;}
}
