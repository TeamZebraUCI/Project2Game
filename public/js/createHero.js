let skillPonints = 20;
$("#skillPoints").text("Skill Points: " + skillPonints);

// increase decrease skill value
$(".skills button").on("click", function (event) {
    event.preventDefault();
    let skill = $(this).attr("data-skill");
    let skillVal = parseInt($("#" + skill).attr("value"));
    if ($(this).text() == "+") {
        if (skillPonints > 0) {
            skillPonints--;
            skillVal++;
        }
    } else if ($(this).text() == "-") {
        if (skillVal > 20) {
            skillPonints++;
            skillVal--;
        }
    }
    $("#skillPoints").text("Skill Points: " + skillPonints);
    $("#" + skill).attr("value", skillVal.toString());
    $("#" + skill + " .skillValStr").text(skill + " : " + skillVal.toString());
});

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    let newChar = {
        "name": $("#name").val().trim(),
        "attack": parseInt($("#Attack").attr("value")),
        "defense": parseInt($("#Defense").attr("value")),
        "health": parseInt($("#Health").attr("value"))
    }
    console.log(newChar);
    createChar(newChar.name, newChar.attack, newChar.defense, newChar.health);
});
function createChar(name, attack, defense, health) {
    $.post("/api/create", {
        name: name,
        attack: attack,
        defense: defense,
        health: health
    }).then(() => {
        window.location.href = "/game"
    });
}