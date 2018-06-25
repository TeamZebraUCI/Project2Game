// Load the inquirer package
var inquirer = require("inquirer");

// Set initial health amounts.
var userHealth = 20;
var dragonHealth = 50;

// Created a generic function that checks if the user won or lost.
function checkRound() {

  console.log("");
  console.log("");

  // If the user has less than 0 health.... then the user lost.
  if (userHealth <= 0) {

    console.log("###############################################");
    console.log("");
    console.log("You've been slain... Your story ends here...");
    console.log("");
    console.log("###############################################");

    // Exit the game
    process.exit();
  }

  // If the dragon has less than 0 health.... then the user won.
  if (dragonHealth <= 0) {

    console.log("###############################################");
    console.log("");
    console.log("Victory! You've slain the dragon!");
    console.log("");
    console.log("###############################################");

    // Exit the game
    process.exit();
  }

  // After performing the "check", the next round is initiated.
  playRound();

}


// This function holds the game logic
function playRound() {

  // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.
  inquirer.prompt([
    {
      type: "list",
      name: "userGuess",
      message: "Try to stay alive! Guess a number between [1-5]",
      choices: ["1", "2", "3", "4", "5"]
    }

  ]).then(function(guess) {

    // If the user is still alive or the dragon is still alive
    if (userHealth > 0 || dragonHealth > 0) {

      // Assign a random damage value for the round.
      var damage = Math.floor(Math.random() * 10) + 5;

      // The dragon should choose a random number.
      var dragonNum = Math.floor((Math.random() * 5)) + 1;
      console.log("");
      console.log("");
      console.log("dragon rolled " + dragonNum);

      // If the user's guess matches the number then...
      if (dragonNum === parseInt(guess.userGuess)) {

        // Subtract the damage amount from the dragon's health.
        dragonHealth -= damage;
        console.log("You slash the dragon with " + damage + " damage");
      }

      else {
        // Subtract the damage amount from the user's health.
        userHealth -= damage;
        console.log("OH NO! The dragon slashed you with " + damage + " damage");

      }
      console.log("You have " + userHealth + " health left. The dragon has " + dragonHealth + " health left.");
      // Check if the game is over.
      checkRound();
    }
  });
}

// Starts the game!
playRound();