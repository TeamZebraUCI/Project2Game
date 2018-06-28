// default screen, start button to begin/reset game
// display player health, enemy health, health potion inventory
// game loads, player given choices on next action to take
// action performed, result shown, next round starts

// =======================================================================================================
// testing connection to game.html
function test() {
    document.getElementById("combatText").innerHTML = ("hello world");
}

function startGame() {
    let playerHealth = 50;
    // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++
    let dragonHealth = 50;
    // let dragonHealth = 100; +++++++++++++++++++++++++++++++++++++++++++
    $("#playerHealthBar").text("Your health: " + playerHealth);
    // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++
    $("#bossHealthBar").text("Boss health: " + dragonHealth);
    let potionCount = 3;
    $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
}

// =======================================================================================================
// game logic
$(document).ready(function () {
    // set the health for the player and the boss
    let playerHealth = 50;
    // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++
    let playerDefense = 30;
    let dragonHealth = 50;
    // let dragonHealth = 100; +++++++++++++++++++++++++++++++++++++++++++
    $("#playerHealthBar").text("Your health: " + playerHealth);
    // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++
    $("#playerArmor").text("You have " + playerDefense + " armor remaining")
    $("#bossHealthBar").text("Boss health: " + dragonHealth);
    let potionCount = 3;
    $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")

    // =======================================================================================================
    // push the Attack button to play
    $("#attackBtn").on("click", function (event) {
        if (playerHealth || dragonHealth > 0) {
            let playerDamage = Math.floor(Math.random() * 5) + 1;
            // let playerDamage = CharacterData.attack; +++++++++++++++++++++++++++++++++++++++++++
            // let dragonDamage = Math.floor(Math.random() * 5) + 1;
            let dragonDamage = 10;

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
                
                // wear down armor
                playerDefense -= dragonDamage;
                $("#playerArmor").text("You have " + playerDefense + " armor remaining")
            }

            // update characters health after each round
            $("#playerHealthBar").text("Your health: " + playerHealth);
            // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++
            $("#bossHealthBar").text("Boss health: " + dragonHealth);
        }
        if (playerHealth <= 0) {
            // dragon wins
            // disable buttons after game ends
            $("#attackBtn").prop("disabled", true);
            $("#potionBtn").prop("disabled", true);

            // update combat text to display result of game
            $("#combatText").text("You've been slain... Your story ends here...");
        }
        if (dragonHealth <= 0) {
            // player wins
            // disable buttons after game ends
            $("#attackBtn").prop("disabled", true);
            $("#potionBtn").prop("disabled", true);

            // update combat text to display result of game
            $("#combatText").text("Victory! You've slain the dragon!");
        }
    });

    // =======================================================================================================
    // push the potion button to heal your character
    $("#potionBtn").on("click", function (event) {
        if (potionCount > 0) {
            // restore the player's health
            playerHealth = 50;
            // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++
            $("#playerHealthBar").text("Your health: " + playerHealth);
            // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++

            // combat text displays the character used a potion
            $("#combatText").text("Your wounds have healed!");

            // remove one health potion from the player's inventory after use
            potionCount--;

            // update the player's potion counter
            $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
        }
        else {
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
        playerHealth = 50;
        // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++
        $("#playerHealthBar").text("Your health: " + playerHealth);
        // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++
        
        let playerDefense = 30;
        $("#playerArmor").text("You have " + playerDefense + " armor remaining")
       
        dragonHealth = 50;
        // dragonHealth = 100; +++++++++++++++++++++++++++++++++++++++++++
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