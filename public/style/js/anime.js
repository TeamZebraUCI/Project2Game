const swordAttack = anime({
    targets: 'img.sword',
    translateY: [
        { value: -100, duration: 500 },
        { value: 0, duration: 1000 }
    ],
    rotate: {
        value: -450,
        easing: 'easeInOutSine'
    },
    autoplay: false
});
anime({
    targets:'img.sword',
    rotate: -90
})
$("#attackBtn").on("click", event => {
    swordAttack.restart();
});