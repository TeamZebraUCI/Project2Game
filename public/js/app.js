$(document).ready(() => {
  $("#submit").on("click", function (event) {
    // grab users input
    const userCredentials = {
      username: $("input#user-input").val().trim(),
      password: $("input#password-input").val()
    };
    // validate the username and password are not blank
    if ($('#isNewUser').prop('checked')){
      console.log("user wants to create account");
      // user wants to create a new account
      $.post("/api/signUp",userCredentials).then((res)=>{
        console.log(res);
      });
    }else{
      console.log("user wants to login to existing account");
      // user wants to login to existing account
      $.post("/api/login",userCredentials).then((res)=>{
        console.log(res);
      });
    }
  });
});