function update(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          document.getElementById("pin").innerHTML = myObj.PIN;
          document.getElementById("dato").innerHTML = myObj.date;
          time = JSON.stringify(myObj.time);
          document.getElementById("time").innerHTML = myObj.time;
          //document.getElementById("responses").innerHTML = myObj.responses;
          document.getElementById("subjectID").innerHTML = myObj.subjectID;
          document.getElementById("subject").innerHTML = myObj.subject;
      }
    };
    xmlhttp.open("GET", "getLecture.php?q=", true);
    xmlhttp.send();
}
