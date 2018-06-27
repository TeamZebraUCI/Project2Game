const db = require("../models");

module.exports = function(app) {
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.Users.create({
      userName: req.body.name,
      password: req.body.password
    });
  });
};
