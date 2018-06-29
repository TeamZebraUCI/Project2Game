// default screen, start button to begin/reset game
// display player health, enemy health, health potion inventory
// game loads, player given choices on next action to take
// action performed, result shown, next round starts

// =======================================================================================================
//Set counts for user character
function startGame() {
    let playerHealth = 30;
    let dragonHealth = 50;
    $("#playerHealthBar").text("Your health: " + playerHealth);
    $("#bossHealthBar").text("Boss health: " + dragonHealth);
    let potionCount = 3;
    $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
}

// =======================================================================================================
//Starting Game
$(document).ready(function () {
    startGame();

    // =======================================================================================================
    //Push the attack button to fight dragon
    $("#attackBtn").on("click", function (event) {

        if (playerHealth || dragonHealth > 0) {
            let playerDamage = Math.floor(Math.random() * 5) + 1;
            let dragonDamage = Math.floor(Math.random() * 5) + 1;

            let playerNum = Math.floor((Math.random() * 3)) + 1;
            let dragonNum = Math.floor((Math.random() * 3)) + 1;

            if (dragonNum === playerNum) {
                // Subtract the damage amount from the dragon's health.
                dragonHealth -= playerDamage;
                $("#combatText").text("Clean hit! You slashed the dragon for " + playerDamage + " damage");
            } else {
                // Subtract the damage amount from the player's health.
                playerHealth -= dragonDamage;
                $("#combatText").text("Damn! The dragon slashed you for " + dragonDamage + " damage");

            }

            // update characters health after each round
            $("#playerHealthBar").text("Your health: " + playerHealth);
            $("#bossHealthBar").text("Boss health: " + dragonHealth);
        }
        if (playerHealth <= 0) {
            // disable buttons after game ends
            $("#attackBtn").prop("disabled", true);
            $("#potionBtn").prop("disabled", true);

            // update combat text to display result of game
            $("#combatText").text("You've been slain... Your story ends here...");
            //post when game is over and you have lost to dragon
            $.post("/api/loseGame", playerHealth, dragonHealth)
                // on success, run this callback
                .then(function (data) {
                    // log the data we found
                    console.log(data);
                    // tell the user we're adding a character with an alert window
                    alert("Adding character...");
                });

        }

        if (dragonHealth <= 0) {
            // disable buttons after game ends
            $("#attackBtn").prop("disabled", true);
            $("#potionBtn").prop("disabled", true);

            // update combat text to display result of game
            $("#combatText").text("Victory! You've slain the dragon!");
            //post when game is over and you have defeated dragon
            $.post("/api/winGame", playerHealth, dragonHealth)
                // on success, run this callback
                .then(function (data) {
                    // log the data we found
                    console.log(data);
                    // tell the user we're adding a character with an alert window
                    alert("Adding character...");
                });
        }
    });

    // =======================================================================================================
    // push the potion button to heal your character
    $("#potionBtn").on("click", function (event) {
        if (potionCount > 0) {
            // restore the player's health
            playerHealth = 30;
            $("#playerHealthBar").text("Your health: " + playerHealth);

            // combat text displays the character used a potion
            $("#combatText").text("Your wounds have healed!");

            // remove one health potion from the player's inventory after use
            potionCount--;

            // update the player's potion counter
            $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
        } else {
            // update potionCountNum
            $("#potionCountNum").text("Oh crap! You have " + potionCount + " health potions remaining!");

            // inform the player that they are out of health potions
            $("#combatText").text("Shit! You're out of health potions!");
        }
    });

    // =======================================================================================================
    // push start button to reset game
    $("#startBtn").on("click", function (event) {
        // reset all numbers to restart game
        playerHealth = 30;
        $("#playerHealthBar").text("Your health: " + playerHealth);
        dragonHealth = 50;
        $("#bossHealthBar").text("Boss health: " + dragonHealth);
        potionCount = 3;
        $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")

        // reset combat text
        $("#combatText").text("");

        // enable buttons to play again
        $("#attackBtn").prop("disabled", false);
        $("#potionBtn").prop("disabled", false);
    });
});