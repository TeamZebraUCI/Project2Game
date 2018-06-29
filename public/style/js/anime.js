const swordAttack = anime({
    targets: 'img.sword',
    translateY: [
        { value: -20, duration: 500 },
        { value: 0, duration: 500 }
    ],
    translateX: [
        { value: 40, duration: 500 },
        { value: 0, duration: 500 }
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