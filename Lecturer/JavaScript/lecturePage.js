/*  All JavaScript functions for lecture pages    */


/*  When a lecture is clicked, open it   */
function openLecture(myObj) {
    var lecture = myObj;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;

            /* If response buttons are already added, show these when opening the lecture */
            getResponseButtons(lecture.ID);

            var header = document.getElementById("lectureName");
            var lectureName = document.getElementById("lectureNameInfo");
            var lectureDate = document.getElementById("lectureDate");
            var lectureTime = document.getElementById("lectureTime");
            var lectureCategory = document.getElementById("lectureCategory");
            var lectureID = document.getElementById("lectureID");

            /* Show all info about the lecture from the database */
            header.innerHTML = lecture.title;
            lectureName.innerHTML = lecture.title;
            lectureDate.innerHTML = lecture.date;
            lectureTime.innerHTML = lecture.time;
            lectureCategory.innerHTML = lecture.category_name;
            lectureID.innerHTML = lecture.ID;
        }
    };

    xhttp.open("POST", "AJAX_files/lecture.html", true);
    xhttp.send();
}

/*    Lecture.html -  Get response buttons for the given lecture  */
function getResponseButtons(lectureID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var noResponsesDiv = document.getElementById("noResponsesDiv");
            var noResponsesDiv2 = document.getElementById("noResponsesDiv2");
            var responses = document.getElementById("responses");
            var responseTitles = document.getElementById("responseTitles");

            /* If no response buttons, say so */
            if (this.responseText=="[]"){
                var text = document.createTextNode("You don't have any response buttons for this lecture yet, add some.")
                var text2 = document.createTextNode("You didn't add response buttons for this lecture.")
                noResponsesDiv.appendChild(text);
                noResponsesDiv2.appendChild(text2);
            }

            /* Else, view response buttons that are added */
            else {
                for (x in myObj) {
                    response = myObj[x].text;
                    noResponsesDiv.style.display = "none";
                    noResponsesDiv2.style.display = "none";

                    var h2 = document.createElement("h2");
                    var span = document.createElement("span");
                    var span2 = document.createElement("span");
                    var text = document.createTextNode(response);
                    var text2 = document.createTextNode(response);
                    var p = document.createElement("p");
                    var counter = document.createTextNode("0");
                    var h3 = document.createElement("h3");

                    h2.className = "responseButton";
                    span.className = "label label-primary";
                    span2.className = "label label-primary";
                    p.className = "counter";
                    p.id = myObj[x].text;
                    p.appendChild(counter);
                    span.appendChild(text);
                    span2.appendChild(text2);
                    h2.appendChild(span);
                    h3.appendChild(span2);
                    responses.appendChild(h2);
                    responses.appendChild(p);
                    responseTitles.appendChild(h3);
                }
            }
        }
    };

    var data = "lectureID=" + lectureID;
    xhttp.open("POST", "PHP_scripts/getResponseButtons.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}


/*   Get lecure by ID so that response button is added to correct lecture  */
function addResponseButton() {
    event.preventDefault();
    var lectureID = document.getElementById("lectureID").innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            /* After getting lecture, add button */
            addResponseButton2(myObj);
            }
    };

    var data = "ID=" + lectureID;
    xhttp.open("POST", "PHP_scripts/getLectureByID.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}

/*    After getting the correct lecture, add the response button    */
function addResponseButton2(lecture) {
    var responseType = document.getElementById("responseType").value;
    if (responseType==""){
        alert("Reponse type cannot be empty.");
    }
    else {
        var lectureID = lecture.ID;

        event.preventDefault();
        var dataString = 'responseType=' + responseType + '&lectureID=' + lectureID;

        $.ajax({
            type: "POST",
            url: "PHP_scripts/addResponseType.php",
            data: dataString,
            success: function(text) {
                /* Open lecture with new response button added */
                openLecture(lecture);
            },
            error: function(jqXHR, exception) {
                console.log(jqXHR);
            }

        });
    }
}


/*   When clicking start lecture, start the lecture and view content from student feedback  */
function startLecture() {
    var button = document.getElementById("startLectureButton");
    var div = document.getElementById("lectureStartedDiv");
    var divBefore = document.getElementById("lectureNotStartedDiv");

    div.style.display = "block";
    divBefore.style.display = "none";
    button.style.display = "none";

    /* Set interval for when new questions and feedback should be updated */
    setInterval(function(){ updateCounterAndQuestions(); }, 1000);

}


/*   Update questions and counters at given time interval  */
function updateCounterAndQuestions() {
    getCounter();
    renderStudentQuestions();
}


/*  Get counter for each response type when time interval is reached */
function getCounter() {
    var id = document.getElementById("lectureID").innerHTML;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            if (this.responseText=="[]"){return;}
            else {
                /* for each response type, get the feedback counter */
                for (x in myObj) {
                    if(myObj[x].response_type){
                        responseType = document.getElementById(myObj[x].response_type);
                        responseType.innerHTML = myObj[x].count;
                    }
                    else {continue;}
                }
            }
        }
    };
    var data = "lectureID=" + id;
    xhttp.open("POST", "PHP_scripts/getLectureResponseStatistics.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}


/* Fetches and renders questions/posts submited by students. "Post" and "question" used interchangably.
Post is the name of the database-table while quesiton has a more intuitive relation to the concept.*/
function renderStudentQuestions(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Constructs the template for questions-elements
            var questBox = document.createElement("div");
            questBox.innerHTML =
            '<div class="well">'
 +              +'<div class="quest">'
 +                  +'<p class="question"></p>'
 +              +'</div>'
 +              +'<div class="vote">'
 +                  +'<p class="upvotes"></p>'
 +              +'</div>';
            +'</div>';
            //Parsing post-data from the database
            var myObj = JSON.parse(this.responseText);
            if(myObj){
                //Rendering new quesions
                //Fetches the parent element for all the newest quesions
                var newQuest = document.getElementById("newQuest");
                newQuest.innerHTML = "";
                myObj.forEach(function(entry){
                    //Clone questBox
                    var clone = questBox.cloneNode(true);
                    // Set the question and upvotes
                    clone.querySelector(".question").innerHTML = entry.text;
                    clone.querySelector(".upvotes").innerHTML = entry.upvotes;
                    //Appending to parent
                    newQuest.appendChild(clone);
                });

                //Rendering top 5 most upvotes questions
                //Sorting quesitons by upvotes and slicing the 5 first ones
                myObj.sort(function(a,b){
                    return parseInt(b.upvotes) - parseInt(a.upvotes);
                });
                myObj = myObj.slice(0,5);
                //Fetches the parent element for questions with the most votes
                var topQuest = document.getElementById("topQuest");
                topQuest.innerHTML = "";
                myObj.forEach(function(entry){
                    //Clone questBox
                    var clone = questBox.cloneNode(true);
                    // Set the question and upvotes
                    clone.querySelector(".question").innerHTML = entry.text;
                    clone.querySelector(".upvotes").innerHTML = entry.upvotes;
                    //Appending to parent
                    topQuest.appendChild(clone);
                });
            }
        }
    };

    var data = "lectureID="+document.getElementById("lectureID").innerHTML;
    xhttp.open("POST", "PHP_scripts/getPostsSortedByTime.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}
