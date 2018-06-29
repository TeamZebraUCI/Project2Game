const nextPage = function(){};

$(document).ready(() => {
  $("#submit").on("click", function (event) {
    // grab users input
    const userCredentials = {
      username: $("input#user-input").val().trim(),
      password: $("input#password-input").val()
    };
    if ($('#isNewUser').prop('checked')){
      // user wants to create a new account
      $.post("/api/signUp",userCredentials).then((res)=>{
        console.log(res);
        if(!res.usernameFound){
          $("#msg").text("User Created");
          $("#msg").text("Loging in");
          // console.log(res);
          window.location.href = res.url;// <--------------------------------------------go to next page
        }else{
          $("#msg").text("Sorry Username already taken, Try a different one");
        }
      });
    }else{
      // user wants to login to existing account
      $.post("/api/login",userCredentials).then((res)=>{
        console.log(res);
        if(res.usernameFound && res.passwordMatch){
          $("#msg").text("Loging in");
          // console.log(res);
          window.location.href = res.url;// <--------------------------------------------go to next page
        }
        else if(res.usernameFound && !res.passwordMatch){
          $("#msg").text("incorrect Password try again");
        }else if(!res.usernameFound){
          $("#msg").text("No account with that username");
        }
      });
    }
  });
});

