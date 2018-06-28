const db = require("../models");

module.exports = function (app) {
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.Users.create({
      userName: req.body.name,
      password: req.body.password
    }).then(() => {
      res.redirect("/api/login",req.body);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  app.post('/api/login', function (req, res) {
    console.log(req.body);
    db.Users.findOne({
      where: {
        userName: req.body.name,
        password: req.body.password
      }.then(data => {
        // If user exists in database go to createhero
      if(data != ""){
        res.render('createhero');
      }
      })
    });
  });
}
