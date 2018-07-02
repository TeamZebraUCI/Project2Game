"use strict";

const Nightmare = require("nightmare");

describe("Codecademy", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages
  const login = '#user-input';
  const password = '#password-input';

  it("should require me to login", function(done) {
    // ID for the login button.
    return Nightmare({
        show: true
      })
      .goto("http://localhost:3000/")
      // Just to be safe.d
      .wait(login)
      // enter "coffee" at login
      .type(login, "coffee")
      // wait for password input field
      .wait(password)
      // enter "1234" for password
      .type(password, "1234")
      // toggle new user switch
      .wait("#isNewUser")
      .click("#submit")
      // click submit button after login entered
      .wait("#submit")
      .click("#submit")
      // Evaluate the title
      .wait("#user_login")
      .evaluate(function() {
        return document.title;
      })
      .end()
      // Asset the title is as expected
      .then(function(title) {
        expect(title).toEqual("http://localhost:3000/selecthero");
        done();
      });
  }, 30000);
});
