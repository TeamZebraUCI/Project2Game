$(document).ready(function () {
    $(".hero-select").click(function () {
        let userPick = $(this).val();
        $.get("/game", {
        id: userPick,
    }).then(() => {
        window.location.href = "/game"
    });

    });
});// document end