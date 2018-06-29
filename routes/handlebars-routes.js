// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.render('index', { title: 'Login or Signup'});
  });
  app.get("/newhero", function(req, res) {
    res.render('createhero', { title: 'Create Hero!'});
  });
  app.get("/game", function(req, res) {
    db.Character.findAll({}).then(function(results) {
    res.render('game', { title: 'Combat', characters: results});
    });
  });
  app.get("/stats", function(req, res) {
    db.Character.findAll({}).then(function(results) {
    res.render('stats', { title: 'Player Stats!', characters: results});
    });
  });
}
