let capture;
let displayhands = false;
function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.hide();
    textAlign(CENTER, CENTER);
    p = new player();
    button_start = new button("Start", width / 2, height * 0.6, 70);
    button_start.exe = () => {
        gamestarted = true;
    };

    button_restart = new button("Retry", width / 2, height * 0.7, 50);
    button_restart.exe = () => {
        gameover = false;
        mirrorline = -random(4000);
        walls = [];
        score = 0;
        health = 100;
        flip_x = 1;
        flip_y = 1;
    };
    button_restart.exe();
    setup_hands();
}

function draw() {
    main_game();
    draw_hands();
}

function keyPressed() {
    paused = !paused;
}
