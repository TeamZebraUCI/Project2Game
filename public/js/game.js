// =======================================================================================================
// =======================================================================================================
// notes to myself //

// default screen, start button to begin/reset game
// display player health, enemy health, health potion inventory, armor durability
// game loads, player given choices on next action to take
// action performed, result shown, next round starts

// make armor reduce damage by the value remaining (keep flat numbers!)
// turn 1 ex: dragonDamage = 15, armor = 10, player takes 5 damage
// reduce armor durability by 1 next turn
// turn 2 ex: dragonDamage = 15, armor = 9, player takes 6 damage
// armor continues to break throughout the game, playerHealth takes more damage as game goes
// when armor reaches 0, player takes full 15 damage
// **** dragonAttack = dragonDamage - playerDefense; ****


// testing connection to game.html
function test() {
    document.getElementById("combatText").innerHTML = ("hello world");
}


// =======================================================================================================
// =======================================================================================================
// game logic
$(document).ready(function () {
    // set the health for the player
    let playerHealth = 100;
    // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++

    // set health for the dragon
    let dragonHealth = 150;

    // set armor for the player
    let playerDefense = 10;

    // set potion amount
    let potionCount = 3;

    // display player health
    // $("#playerHealthBar").text("Your health: " + playerHealth);
    $("#playerHealthBar").text(`Your health: ${playerHealth}`);
    // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++

    // display dragon health
    // $("#bossHealthBar").text("Boss health: " + dragonHealth);
    $("#bossHealthBar").text(`Boss health: ${dragonHealth}`);

    // display player armor
    // $("#playerArmor").text("You have " + playerDefense + " armor remaining");
    $("#playerArmor").text(`You have ${playerDefense} armor remaining`);

    // display potion inventory
    // $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
    $("#potionCountNum").text(`You have ${potionCount} health potions remaining. Use them wisely!`)


    // =======================================================================================================
    // =======================================================================================================
    // push the Attack button to play
    // $("#attackBtn").on("click", function (event) {
    $("#attackBtn").on("click", (event) => {
        // game is playable as long as both characters have health above 0
        if (playerHealth || dragonHealth > 0) {
            // =======================================================================================================
            // =======================================================================================================
            // combat logic

            // choose a random # to determine who attacks who, odds in dragon's favor
            let playerNum = Math.floor((Math.random() * 3)) + 1;
            let dragonNum = Math.floor((Math.random() * 3)) + 1;

            // random # for the player's damage
            let playerDamage = Math.floor(Math.random() * (12 - 8) + 8);
            // let playerDamage = CharacterData.attack; +++++++++++++++++++++++++++++++++++++++++++

            // random # for the dragon's damage
            let dragonDamage = Math.floor(Math.random() * (16 - 11) + 11);
            // trackable test # below
            // let dragonDamage = 10;

            // deal damage to the player based on the player's armor
            // armor blocks damage equal to itself, excess damage is dealt to the player's health
            const dragonAttack = dragonDamage - playerDefense;


            // =======================================================================================================
            // =======================================================================================================
            // if the player # matches the dragon #, player attacks dragon
            if (dragonNum === playerNum) {
                // Subtract the damage amount from the dragon's health.
                dragonHealth -= playerDamage;
                // $("#combatText").text("Clean hit! You slashed the dragon for " + playerDamage + " damage!");
                $("#combatText").text(`Clean hit! You slashed the dragon for ${playerDamage} damage!`);
            }

            // =======================================================================================================
            // =======================================================================================================
            // if the player # does NOT match the dragon #, dragon attacks player
            else {
                // while player still has armor...
                if (playerDefense >= 1) {
                    // Subtract the damage amount from the player's health.
                    playerHealth -= dragonAttack;
                    $("#combatText").text("Agh! The dragon slashed you for " + dragonDamage + " damage! Your armor blocked " + playerDefense + " damage!");

                    // wear down armor durability
                    playerDefense--;
                    // $("#playerArmor").text("You have " + playerDefense + " armor remaining");
                    $("#playerArmor").text(`You have ${playerDefense} armor remaining`);
                }
                // when player is out of armor...
                if (playerDefense <= 0) {
                    $("#playerArmor").text("Watch out! Your armor has been broken!")

                    // Subtract the damage amount from the player's health.
                    playerHealth -= dragonAttack;
                    // $("#combatText").text("Agh! The dragon slashed you for " + dragonAttack + " damage!");
                    $("#combatText").text(`Agh! The dragon slashed you for ${dragonAttack} damage!`);
                }
            }

            // update characters health after each round
            // $("#playerHealthBar").text("Your health: " + playerHealth);
            $("#playerHealthBar").text(`Your health: ${playerHealth}`);
            // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++
            // $("#bossHealthBar").text("Boss health: " + dragonHealth);
            $("#bossHealthBar").text(`Boss health: ${dragonHealth}`);
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
    // =======================================================================================================
    // push the potion button to heal your character
    // $("#potionBtn").on("click", function (event) {
    $("#potionBtn").on("click", (event) => {
        if (potionCount >= 1) {
            // restore the player's health
            playerHealth = 100;
            // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++
            // $("#playerHealthBar").text("Your health: " + playerHealth);
            $("#playerHealthBar").text(`Your health: ${playerHealth}`);
            // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++

            // combat text displays the character used a potion
            $("#combatText").text("Your wounds have healed!");

            // remove one health potion from the player's inventory after use
            potionCount--;

            // update the player's potion counter
            // $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
            $("#potionCountNum").text(`You have ${potionCount} health potions remaining. Use them wisely!`)
        }
        else {
            // update potionCountNum
            // $("#potionCountNum").text("Oh crap! You have " + potionCount + " health potions remaining!");
            $("#potionCountNum").text(`Oh crap! You have ${potionCount} health potions remaining!`);
            // inform the player that they are out of health potions
            $("#combatText").text("Uh-oh! You're out of health potions!");
        }
    });


    // =======================================================================================================
    // =======================================================================================================
    // push start button to reset game
    // $("#startBtn").on("click", function (event) {
    $("#startBtn").on("click", (event) => {
        // reset all numbers to restart game
        playerHealth = 100;
        // let playerHealth = CharacterData.health; +++++++++++++++++++++++++++++++++++++++++++
        // $("#playerHealthBar").text("Your health: " + playerHealth);
        $("#playerHealthBar").text(`Your health: ${playerHealth}`);
        // $("#playerHealthBar").text(CharacterData.name + ": " + playerHealth); +++++++++++++++++++++++++++++++++++++++++++

        let playerDefense = 10;
        // $("#playerArmor").text("You have " + playerDefense + " armor remaining")
        $("#playerArmor").text(`You have ${playerDefense} armor remaining`);

        dragonHealth = 150;
        // dragonHealth = 100; +++++++++++++++++++++++++++++++++++++++++++
        // $("#bossHealthBar").text("Boss health: " + dragonHealth);
        $("#bossHealthBar").text(`Boss health: ${dragonHealth}`);
        potionCount = 3;
        // $("#potionCountNum").text("You have " + potionCount + " health potions remaining. Use them wisely!")
        $("#potionCountNum").text(`You have ${potionCount} health potions remaining. Use them wisely!`)

        // reset combat text
        $("#combatText").text("");

        // enable buttons to play again
        $("#attackBtn").prop("disabled", false);
        $("#potionBtn").prop("disabled", false);
    });
});