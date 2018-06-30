//Sword Attack Animation
const swordAttack = anime({
    targets: 'img.sword',
    translateY: [
        { value: -20, duration: 50 },
        { value: -300, duration: 800 },
        { value: 0, duration: 500 }
    ],
    translateX: [
        { value: 40, duration: 500 },
        { value: 0, duration: 500 }
    ],
    rotate: {
        value: -750,
        easing: 'easeInOutSine'
    },
    autoplay: false
});

// On click ATTACK event
$("#attackBtn").on("click", event => {
    swordAttack.restart();
});