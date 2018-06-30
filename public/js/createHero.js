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
    let newHero = {
        name: $("#name").val().trim(),
        attack: parseInt($("#Attack").attr("value")),
        defense: parseInt($("#Defense").attr("value")),
        health: parseInt($("#Health").attr("value")),
        owner : 1 // <-------------------------------- STATIC USER FOR DEV
    };

    console.log(newHero);

    $.post("/api/newHero",newHero).then(res=>{
        console.log(res);
        if (res.validRequest){
            if(res.userId){
                if (Number.isInteger(res.userHeroCount.current)){
                    if (res.userHeroCount.prev < res.userHeroCount.current){
                        console.log("Character created!");
                        
                        // window.location.href = res.url;
                    }
                    else if (res.userHeroCount.prev == res.userHeroCount.current){
                        console.log(" character NOT created");
                    }
                }
            }else{
                console.log(" INVALID USER ID");
            }
        }else{
            console.log(" INVALID REQUEST SENT");
        }
    });

});