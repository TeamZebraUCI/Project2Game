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
            $("#combatText").text("Clean hit! You slashed the dragon for " + playerDamage + " damage");
        }
        else {
            // Subtract the damage amount from the player's health.
            playerHealth -= dragonDamage;
            $("#combatText").text("Damn! The dragon slashed you for " + dragonDamage + " damage");

        }

        // update characters health after each round
        $("#playerHealthBar").text("Your health: " + playerHealth);
        $("#bossHealthBar").text("Boss health: " + dragonHealth);

        if (playerHealth <= 0) {
            // the boss wins
            $("#combatText").text("You've been slain... Your story ends here...");
            // prevent button from working after the game ends
            $("#attackBtn").attr("onclick", "").unbind("click");
        }
        if (dragonHealth <= 0) {
            // the player wins
            $("#combatText").text("Victory! You've slain the dragon!");
            // prevent button from working after the game ends
            $("#attackBtn").attr("onclick", "").unbind("click");
        }
    });
});
