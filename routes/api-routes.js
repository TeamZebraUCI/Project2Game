const db = require("../models");

module.exports = function (app) {
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      userName: req.body.name,
      password: req.body.password
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  //given credentials for a user{username,password},
  //  return result={usernameFound,passwordMatch}, result returns two booleans
  app.post("/api/login", (req, res) => {
    db.User.findOne({
      //search for username
      where: { username: req.body.username }
    }).then(dbResult => {
      //default that credentials not found
      let response = {
        usernameFound: false,
        passwordMatch: false
      }
      //if username exists
      if (dbResult != null) {
        response.usernameFound = true;
        //if passwords match
        if (dbResult.password == req.body.password) {
          response.passwordMatch = true;
        }
      }
      res.json(response);
    });
  });

  app.post("/api/create", function (req, res) {
    console.log(req.body);
    db.Character.create({
      name: req.body.name,
      attack: req.body.attack,
      defense: req.body.defense,
      health: req.body.health
    }).then(() => {
      window.location.href = "/game"
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
}; //export end
