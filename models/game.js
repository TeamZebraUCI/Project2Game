// default screen, start button to begin game
// display player health and enemy health
// game loads, player given choices on next action to take
// action performed, result shown, next round starts

// =======================================================================================================
// testing connection to game.html
function test() {
    document.getElementById("combatText").innerHTML = ("hello world");
}

// =======================================================================================================
// game logic

$(document).ready(function () {
    // set the health for the player and the boss
    let playerHealth = 30;
    let dragonHealth = 30;
    $("#playerHealthBar").text("Your health: " + playerHealth);
    $("#bossHealthBar").text("Boss health: " + dragonHealth);

    // push the Attack button to play
    $("#attackBtn").on("click", function (event) {
        let playerDamage = Math.floor(Math.random() * 5) + 1;
        let dragonDamage = Math.floor(Math.random() * 5) + 1;

        let playerNum = Math.floor((Math.random() * 3)) + 1;
        let dragonNum = Math.floor((Math.random() * 3)) + 1;

        if (dragonNum === playerNum) {
            // Subtract the damage amount from the dragon's health.
            dragonHealth -= playerDamage;
            $("#combatText").text("You slash the dragon with " + playerDamage + " damage");
        }
        else {
            // Subtract the damage amount from the player's health.
            playerHealth -= dragonDamage;
            $("#combatText").text("OH NO! The dragon slashed you with " + dragonDamage + " damage");

        }
        $("#playerHealthBar").text("Your health: " + playerHealth);
        $("#bossHealthBar").text("Boss health: " + dragonHealth);
    });
});

    // function checkRound() {

    //     // If the player has less than 0 health.... then the player lost.
    //     if (playerHealth <= 0) {
    //         $("#combatText").text("You've been slain... Your story ends here...");
    //        
    //         // Exit the game
    //         process.exit();
    //     }

    //     // If the dragon has less than 0 health.... then the player won.
    //     if (dragonHealth <= 0) {
    //         $("#combatText").text("Victory! You've slain the dragon!");
    //          
    //         // Exit the game
    //         process.exit();
    //     }

    //     // After performing the "check", the next round is initiated.
    //     playRound();

    // }

    // // =======================================================================================================
    // // This function holds the game logic

    // $("#attackBtn").prepend(function() {
    //     let round = [{
    //         type: "list",
    //         name: "playerGuess",
    //         message: "Try to stay alive! Guess a number between [1-3]",
    //         choices: ["1", "2", "3",]
    //     }]

    //     // If the player is still alive or the dragon is still alive
    //     if (playerHealth > 0 || dragonHealth > 0) {

    //         // random number for the dragon's damage
    //         let dragonDamage = Math.floor(Math.random() * 6) + 2;

    //         // random number for the player's damage
    //         let playerDamage = Math.floor(Math.random() * 5) + 1;

    //         // The dragon should choose a random number.
    //         let dragonNum = Math.floor((Math.random() * 3)) + 1;
    //         $("#combatText").text("");
    //         $("#combatText").text("");
    //         $("#combatText").text("dragon rolled " + dragonNum);

    //         // If the player's guess matches the number then...
    //         if (dragonNum === parseInt(guess.playerGuess)) {

    //             // Subtract the damage amount from the dragon's health.
    //             dragonHealth -= playerDamage;
    //             $("#combatText").text("You slash the dragon with " + playerDamage + " damage");
    //         }

    //         else {
    //             // Subtract the damage amount from the player's health.
    //             playerHealth -= dragonDamage;
    //             $("#combatText").text("OH NO! The dragon slashed you with " + dragonDamage + " damage");

    //         }
    //         $("#combatText").text("You have " + playerHealth + " health left. The dragon has " + dragonHealth + " health left.");
    //         // Check if the game is over.
    //         checkRound();
    //     }
    // });

    // // Starts the game!
    // playRound()
