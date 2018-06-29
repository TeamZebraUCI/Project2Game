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

const precessHero = function(hero){
    console.log("CHECKING HERO:");
    console.log(hero);
    let statSum = 0;
    hero.defense = hero.defense.trim();
    hero.attack = hero.attack.trim();
    hero.health = hero.health.trim();
    // make sure values are in attr
    if (hero.defense || hero.attack || hero.helath){
      if (!isNaN(hero.defense) || !isNaN(hero.attack) || !isNaN(hero.health)){

      }

      return result;
    }


    // // make sure that def att, hlth are integers if not, return false
    // const statNames= ["defense","attack","health"];
    // for (var stat=0; stat<statNames.length; stat++){
    //   if (!Number.isInteger(hero[statNames[stat]])){
    //     console.log("----- an att is not an int");
    //     console.log(stat + " = " + hero[statNames[stat]] + " : " + typeof(hero[statNames[stat]]));
    //     return false;
    //   }else{
    //     statSum += hero[statNames[stat]];
    //   }
    // }
    // ensure that id is an int and name is not blank
    if(!Number.isInteger(hero.id) && hero.name.trim()){
      return false;
    }
    // make sure that stats are within our range
    return (statSum == 20) //<------------------------ SKILL POINTS MAX SET HERE
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
          searchResults.url = "/newhero/" + userid;
        }
      }
      res.json(searchResults);
    });
  });

  //req = {fields: [ 'name', 'defense', 'attack', 'health', "owner"]}
  app.post("/api/newHero",(req,res)=>{
    let result = {
      validRequest: false,
      userId: null,
      userHeroCount: {
        prev:null,
        current:null,
      },
      url: null
    }
    if(heroIsValid(req.body)){
      // if new hero req inputs are valid
      db.User.findOne({
        where:{ id: req.body.owner}
      }).then((user)=>{
        if(user != null){
          result.userId = user.id;
          result.userHeroCount.prev = user.heroCount;
          result.userHeroCount.current = user.heroCount;
          // if user is found
          if(user.heroCount < 5){//<--------------- Hero MAX SET HERE
            // if user has space for a hero, create it
            db.Hero.create(req.body).then(()=>{
              result.heroCount.current++;
              // update heroCount for that user
              db.User.update({
                heroCount: user.heroCount++
              },{
                where:{
                  id:req.body.owner
                }
              }).then(()=>{
                // character created and database updated
                res.url = "/game"; //<------------------------------redirect to next PAGE
                res.json(result);
              })              
            });
          }else{
            // User already has max num of characters
            res.json(result)
          }
        }else{
          // No User with that ID
          res.json(result);
        }
      });  
    }else{
      // validRequest = false
      res.json(result);
    }
  });

};
