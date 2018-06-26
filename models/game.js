// =======================================================================================================
// testing connection to game.html
function test() {
    console.log("hello world");
}

function test2() {
    alert("hello world");
}

// =======================================================================================================
// game logic, taken from 08-nodejs/01-Activities/29-ZombieChallenge

// Load the inquirer package
var inquirer = require("inquirer");

// Set initial health amounts.
var playerHealth = 50;
var dragonHealth = 50;

// Created a generic function that checks if the player won or lost.
function checkRound() {

    console.log("");
    console.log("");

    // If the player has less than 0 health.... then the player lost.
    if (playerHealth <= 0) {

        console.log("###############################################");
        console.log("");
        console.log("You've been slain... Your story ends here...");
        console.log("");
        console.log("###############################################");

        // Exit the game
        process.exit();
    }

    // If the dragon has less than 0 health.... then the player won.
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
    console.log("==============================================="),

    // We create a list prompt. Specifying that the player must pick a random number between 1 and 5.
    inquirer.prompt([
        {
            type: "list",
            name: "playerGuess",
            message: "Try to stay alive! Guess a number between [1-3]",
            choices: ["1", "2", "3",]
        }

    ]).then(function (guess) {

        // If the player is still alive or the dragon is still alive
        if (playerHealth > 0 || dragonHealth > 0) {

            // random number for the dragon's damage
            var dragonDamage = Math.floor(Math.random() * 10) + 5;

            // random number for the player's damage
            var playerDamage = Math.floor(Math.random() * 5) + 1;

            // The dragon should choose a random number.
            var dragonNum = Math.floor((Math.random() * 3)) + 1;
            console.log("");
            console.log("");
            console.log("dragon rolled " + dragonNum);

            // If the player's guess matches the number then...
            if (dragonNum === parseInt(guess.playerGuess)) {

                // Subtract the damage amount from the dragon's health.
                dragonHealth -= playerDamage;
                console.log("You slash the dragon with " + playerDamage + " damage");
            }

            else {
                // Subtract the damage amount from the player's health.
                playerHealth -= dragonDamage;
                console.log("OH NO! The dragon slashed you with " + dragonDamage + " damage");

            }
            console.log("You have " + playerHealth + " health left. The dragon has " + dragonHealth + " health left.");
            // Check if the game is over.
            checkRound();
        }
    });
}

// Starts the game!
playRound();