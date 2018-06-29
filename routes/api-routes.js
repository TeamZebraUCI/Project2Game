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

const processHero = function(hero){
    let result = {
      isValid: false,
      parsedHero:{}
    };

    // make sure that owner and name are int & not-empty
    if(!isNaN(hero.owner) && hero.name.trim()){
      result.parsedHero.owner = parseInt(hero.owner);
      result.parsedHero.name = hero.name.trim();
    }else{
      return result;
    }

    // make sure that def att, hlth are integers if not, return false
    let statSum = 0;
    const statNames= ["defense","attack","health"];
    for (var stat=0; stat<statNames.length; stat++){
      let userInput = hero[statNames[stat]];
      if(!isNaN(userInput)){
        userInput = parseInt(userInput);
        result.parsedHero[statNames[stat]] = userInput;
        statSum += userInput;
      }else{
        return result;
      }
    }

    console.log("statSum=" + statSum);

    result.isValid = (statSum == 80)//<------------------------ SKILL POINTS MAX SET HERE

    return result;

  };

module.exports = function (app) {

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
    const heroData = processHero(req.body)
    console.log(heroData);
    if(heroData.isValid){
      // if new hero req inputs are valid
      result.validRequest = true;
      db.User.findOne({
        where:{ id: heroData.parsedHero.owner}
      }).then((user)=>{
        if(user != null){
          result.userId = user.id;
          result.userHeroCount.prev = user.heroCount;
          result.userHeroCount.current = user.heroCount;
          // if user is found
          if(user.heroCount < 5){//<--------------- Hero MAX SET HERE
            // if user has space for a hero, create it
            db.Hero.create(heroData.parsedHero).then(()=>{
              result.userHeroCount.current++;
              // update heroCount for that user
              db.User.update({
                heroCount: result.userHeroCount.current
              },{
                where:{
                  id: heroData.parsedHero.owner
                }
              }).then(()=>{
                // character created and database updated
                res.url = "/game"; //<------------------------------redirect to next PAGE
                console.log("2222");
                res.json(result);
              })              
            });
          }else{
            // User already has max num of characters
            console.log("1111");
            res.json(result)
          }
        }else{
          console.log("0000");
          // No User with that ID
          res.json(result);
        }
      });  
    }else{
      // validRequest = false
      console.log("--------")
      res.json(result);
    }
  });


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

};
