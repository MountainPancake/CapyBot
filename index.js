
//Haralds kode for StudentLogin

function studentLogin(){
    event.preventDefault();
    var dataString = "email="+document.getElementById("email").value+"&password="+document.getElementById("password").value;

    $.ajax({
        type: "POST",
        url: "Student/PHP/studentLogin.php",
        data: dataString,
        success: function(text) {
            console.log(text);
            if(text == "success"){
                location.href = "Student/studentNotInLecture.html"
            }
            else{
                alert("Login failed. \nUsername and/or password incorrect.")
            }
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }
    });
}

//Haralds kode for å lage studentbruker

function createStudentUser(){
	event.preventDefault();
    var dataString = "email="+document.getElementById("newEmail").value+"&password="+document.getElementById("newPassword").value;
    console.log(dataString);
    $.ajax({
        type: "POST",
        url: "createStudentUser.php",
        data: dataString,
        success: function(text) {
        	console.log(text)
            if(text == "success"){
            	console.log("inni success bro")
                location.href = "index.html"
            }
            else{
                alert("Failed to create user. \nThe username may already exist.")
            }
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }
    });
}

//slutt på Haralds Kode







function signIn() {


}

function createNewUser() {
    var createUser = document.getElementById("createUser");
    var logIn = document.getElementById("logIn");

    createUser.style.display = "block";
    logIn.style.display = "none";

}

function signInClick() {
    console.log("Lorem ipsum dolor sit amet");
    var createUser = document.getElementById("createUser");
    var logIn = document.getElementById("logIn");

    logIn.style.display = "block";
    createUser.style.display = "none";
}
