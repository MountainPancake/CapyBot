
//Haralds kode for StudentLogin

function studentLogin(){
    event.preventDefault();
    var dataString = "email="+document.getElementById("email").value+"&password="+document.getElementById("password").value;

    $.ajax({
        type: "POST",
        url: "Student/studentLogin.php",
        data: dataString,
        success: function(text) {
            /*if(text == "success"){
                location.href = "student_notLoggedIn.php"
            }
            else{
                alert("Login failed. \nUsername and/or password incorrect.")
            }*/
            console.log(text);
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
