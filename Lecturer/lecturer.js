function Test() {
    console.log("klikk");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("main").innerHTML = this.responseText;
     console.log("main");
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}
