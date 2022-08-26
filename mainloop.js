
let t = 0;
let p;
let walls = [];
let wall_tick = 100;
let flip_x = 1,
    flip_y = 1;

function main_game() {
    translate(width / 2, height / 2);
    scale(flip_x, flip_y);
    translate(-width / 2, -height / 2);
    image(capture, 0, 0, width, height);
    noStroke();
    fill(0, 100);
    rectMode(CORNER);
    rect(0, 0, width, height);

    p.work();
    if (!gamestarted) {
        screen_menu();
        return;
    }
    if (paused) {
        screen_pause();
        return;
    }
    walls_work();
    // screen_pause();
    screen_ui();
    t += 1;
}

let mirrorline;
let firrorline = -100;
function walls_work() {
    rectMode(CORNER);
    strokeWeight(2);

    for (let i = 0; i < walls.length; ++i) {
        walls[i].work();
        walls[i].y += walls[i].speed;
        if (walls[i].y > height) {
            if (!gameover) score += 20;
            walls.splice(i, 1);
        }
    }
    if (t % wall_tick === 0) {
        walls.push(new wall());
    }
    strokeWeight(4);
    stroke(255, 0, 255);

    mirrorline += noise(t / 100) * 10;
    line(0, mirrorline, width, mirrorline);
    if (dist(0, mirrorline, 0, p.y) < p.r) {
        mirrorline = -random(200, 2000);
        flip_x *= -1;
    }

    // stroke(0, 255, 255);
    // firrorline += noise(t/100)*10 ;
    // line(0, firrorline, width, firrorline);
    // if (dist(0, firrorline, 0, p.y) < p.r) {
    //   firrorline = -random(200, 2000);
    //   flip_y *= -1 ;
    // }
}
