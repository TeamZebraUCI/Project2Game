$(document).ready(function () {
    $(".hero-select").click(() => {
        const userPick = $(this).val();
        $.get("/game/" + userPick, function (data) {
        }).then(() => {
            window.location.href = "/game/" + userPick
        });

    });
});// document end