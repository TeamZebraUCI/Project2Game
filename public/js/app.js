const nextPage = function(){};

$(document).ready(() => {
  $("#submit").on("click", function (event) {
    // grab users input
    const userCredentials = {
      username: $("input#user-input").val().trim(),
      password: $("input#password-input").val()
    };
    // validate the username and password are not blank
    if ($('#isNewUser').prop('checked')){
      // user wants to create a new account
      $.post("/api/signUp",userCredentials).then((res)=>{
        if(res.userId != null){
          // user was successfully created
          $.get("/newhero");
        }else if(res.usernameFound){
          $("#msg").text("Sorry Username already taken, Try a different one");
        }
      });
    }else{
      // user wants to login to existing account
      $.post("/api/login",userCredentials).then((res)=>{
        if(res.usernameFound && res.passwordMatch){
          $.get("/newhero");
        }
        else if(res.usernameFound && !res.passwordMatch){
          $("#msg").text("incorrect Password try again");
        }else if(!res.usernameFound){
          $("#msg").text("No account with that Username found");
        }
      });
    }
  });
});

