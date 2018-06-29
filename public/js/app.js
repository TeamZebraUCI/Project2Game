$(document).ready(function () {
  // Getting references to our form and input
  const userInput = $("input#user-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#signup").on("click", function (event) {
    const userData = {
      name: userInput.val().trim(),
      password: passwordInput.val().trim()
    };
    console.log(userData);
    if (!userData.name || !userData.password) {
      return;
    }
    if ($('#isNewUser').prop('checked')) {
      $.post("/api/signup", {
        name: userData.name,
        password: userData.password
      }).then(() => {
         res.redirect("/newhero");
      });
      userInput.val("");
      passwordInput.val("");
    } else {
      $.post("/api/login", {
        name: userData.name,
        password: userData.password
      }).then(() => {
        location.reload();
      });
      userInput.val("");
      passwordInput.val("");
    }

  });
});