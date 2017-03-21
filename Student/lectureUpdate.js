function getChanges(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          dbParam = JSON.stringify(myObj);
          document.getElementById("date").innerHTML = dbParam;
      }
    };
    xmlhttp.open("GET", "getLecture.php?q=", true);
    xmlhttp.send();
}
