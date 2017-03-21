function testFunction() {
    console.log("klikk");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("hei").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "test.txt", true);
    xhttp.send();
}
