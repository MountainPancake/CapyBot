/* Functions for when the lecturer has not yet logged in, that is lecturerIndex.html and createLecturerUser.html */


/* Log in function */
function lecturerLogin(){
  event.preventDefault();
  var dataString = "email="+document.getElementById("email").value+"&password="+document.getElementById("password").value;

  $.ajax({
      type: "POST",
      url: "PHP_scripts/lecturerLogin.php",
      data: dataString,
      success: function(text) {
        if(text == "success"){
          location.href = "loggedIn.html";
        }else{
          alert("Login failed.\nEmail and/or password incorrect.")
        }
      },
      error: function(jqXHR, exception) {
          console.log(jqXHR);
      }
  });
}
