$(document).ready(function () {
    $(".hero-select").click(function () {
        let userPick = $(this).val();
        $.post("/game/:id", {
        id: userPick,
    }).then(() => {
        window.location.href = "/game/:id"
    });

    });
});// document end