const swordAttack = anime({
    targets: 'img.sword',
    translateY: [
        { value: -200, duration: 500 },
        { value: 0, duration: 800 }
    ],
    rotate: {
        value: '1turn',
        easing: 'easeInOutSine'
    },
    autoplay: false
});
$("#attackBtn").on("click", function (event) {
    swordAttack.restart();
});
