let skillPoints = 20;
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
    $.post("/api/newHero",newHero).then(res=>{
        console.log(res);
        if (res.validRequest){
            if(res.userId){
                if (Number.isInteger(res.userHeroCount.current)){
                    if (res.userHeroCount.prev < res.userHeroCount.current){
                        window.location.href = res.url; // <----------------------------------------------redirect when successfull character created
                    }
                    else if (res.userHeroCount.prev == res.userHeroCount.current){
                        $("#msg").text("Already made 5 heros");
                        console.log(" character NOT created (already have max hero's or other error");
                        // SHOULD HAVE BUTTON TO REDIRECT TO CHARACTER SELECT ---------------------------- NEED ANOTHER BUTTON 
                    }
                }
            }else{
                console.log(" INVALID USER ID");
            }
        }else{
            $("#msg").text("Make sure to use all points and give hero a name");
            console.log(" INVALID REQUEST SENT");
        }
    });

});