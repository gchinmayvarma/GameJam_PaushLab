let transition = 0;
let paused = false;
function screen_pause() {
    transition = constrain(transition + 0.02, 0, 1);
    rectMode(CORNER);
    noStroke();

    fill(lerpColor(color(0, 0), color(0, 200), transition));
    rect(0, 0, width, height);
    fill(155);

    textSize(60);
    text("< Paused >", width / 2, height / 3);
    fill(100);
    textSize(20);
    text("Tracking lost", width / 2, height / 3 + 60);
}

let gameover = false;
let score = 0;
let button_restart;
function screen_gameover() {
    transition = constrain(transition + 0.02, 0, 1);
    rectMode(CORNER);
    noStroke();
    fill(lerpColor(color(0, 0), color(0, 200), transition));
    rect(0, 0, width, height);
    fill(155);

    textSize(60);
    text("< Game Over >", width / 2, height / 3);
    fill(100);
    textSize(20);
    text("Score", width / 2, height / 3 + 60);
    fill(200);
    textSize(90);
    text(score, width / 2, height / 3 + 160);
    button_restart.work();
}

let health = 100;

function screen_ui() {
    noStroke();
    textSize(60);
    fill(200);
    if (!gameover) text(score, width / 2, height * 0.87);
    fill(155);
    textSize(20);
    text("Health", width / 2, height * 0.92);
    textSize(10);
    text(round(health), width / 2, height * 0.94);
    rectMode(CENTER);
    fill(255 - (health * 255) / 100, (health * 255) / 100, 0);
    rect(width / 2, height * 0.95, (health * width) / 150, 2);
    if (gameover) screen_gameover();
}

let gamestarted = false;

function screen_menu() {
    noStroke();
    fill(0, 50);
    rectMode(CORNER);
    rect(0, 0, width, height);
    textSize(45);
    fill(255, 255, 255, 150);
    text("< Mirrors Wedge > ", width / 2 + random(-1, 1), height / 3 + random(-1, 1));
    fill(255, 0, 69, 50);
    text("< Mirrors Wedge > ", width / 2 + random(-5, 5), height / 3 + random(-3, 3));
    fill(69, 0, 255, 50);
    text("< Mirrors Wedge > ", width / 2 + random(-5, 5), height / 3 + random(-3, 3));
    button_start.work();
}
