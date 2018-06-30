$(document).ready(function () {
    $(".hero-select").click(function () {
        let userPick = $(this).val();

        $.get("/game/" + userPick, function(data){
    }).then(() => {
        window.location.href = "/game/" + userPick
    });

    });
});// document end