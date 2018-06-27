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
    let dragonHealth = 50;
    $("#playerHealthBar").text("Your health: " + playerHealth);
    $("#bossHealthBar").text("Boss health: " + dragonHealth);
    let potionCount = 3;
    $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")

    // =======================================================================================================
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
            // prevent action buttons from working after the game ends
            $("#attackBtn").attr("onclick", "").unbind("click");
            $("#potionBtn").attr("onclick", "").unbind("click");
        }
        if (dragonHealth <= 0) {
            // the player wins
            $("#combatText").text("Victory! You've slain the dragon!");
            // prevent action buttons from working after the game ends
            $("#attackBtn").attr("onclick", "").unbind("click");
            $("#potionBtn").attr("onclick", "").unbind("click");
        }
    });

    // =======================================================================================================
    // push the potion button to heal your character
    $("#potionBtn").on("click", function (event) {
        // restore the player's health
        playerHealth = 30;

        // combat text displays the character used a potion
        $("#combatText").text("Your wounds have healed!");

        // remove one health potion from the player's inventory after use
        potionCount--;

        // update the player's potion counter
        $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")

        // prevent the player from using anymore potions once they reach 0
        if (potionCount === 0) {
            // update potionCountNum
            $("#potionCountNum").text("Oh crap! You have " + potionCount + " health potions remaining!");

            // inform the player that they are out of health potions
            $("#combatText").text("Shit! You're out of health potions!");
            
            // prevent the button working when the player is out of potions
            $("#potionBtn").attr("onclick", "").unbind("click");
        }
    })
});
