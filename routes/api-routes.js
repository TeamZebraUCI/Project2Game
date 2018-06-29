const db = require("../models");

  // given credentials for a user{username,password},
  //   return result={usernameFound,passwordMatch}, result returns two booleans
  const findUser = function(credentials,run){
    // default response
    let response = {
      usernameFound: false,
      passwordMatch: false,
      userId: null,
      url: null
    }
    // ensure username and password are not blank before searching
    if(credentials.username && credentials.password){
      db.User.findOne({
        where: {username:credentials.username}
      }).then(dbResult=>{
      // if username exists
      if(dbResult != null){
          response.usernameFound = true;
          //if passwords match
          if(dbResult.password == credentials.password){
              response.passwordMatch = true;
              response.userId = dbResult.id;
          }
      }
      run(response,credentials);
    });
  }
};

module.exports = function (app) {

  app.post("/api/signUp",(req, res)=>{
    findUser(req.body,(searchResults)=>{
      // if username NOT taken
      if (!searchResults.usernameFound){
        // create new user
        console.log("----CREATING USER");
        db.User.create(req.body).then((dbResult)=>{
          // return search results with user new id in response
          searchResults.userId=dbResult.id;
          searchResults.url = "/newhero";
        })
      }else{
        console.log("----ALREADY EXISTS");
        //USER ALREADY EXISTS
        searchResults.passwordMatch = false;
        searchResults.userId = null;
      }
      res.json(searchResults)
    });
  });

  app.post("/api/login",(req,res)=>{
    findUser(req.body,(searchResults)=>{
      console.log(searchResults);
      if(searchResults.usernameFound){
        // if password matches the usernames password
        if(searchResults.passwordMatch){
          // credentials check out, log in this user
          searchResults.url = "/newhero";
        }
      }
      res.json(searchResults);
    });
  });


};
