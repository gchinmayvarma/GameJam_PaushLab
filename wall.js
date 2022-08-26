class wall {
    constructor() {
        this.r = random(40, 60);
        this.d = this.r * 2;
        this.x = random(0, width);
        this.h = 50;
        this.y = -this.h;
        this.speed = random(1.5, 3.5);
    }
    display() {
        stroke(255);
        fill(255, 50);
        rect(0, this.y, this.x - this.d, this.h);
        rect(this.x + this.d, this.y, height - this.d, this.h);
        stroke(100, 200, 100);
        line(this.x, this.y, this.x, this.y + 20);
        noFill();
        circle(this.x, this.y + this.h / 2, this.h / 4);
    }
    work() {
        this.display();
    }
}

class player {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.r = 20;
        this.d = this.r * 2;
    }
    boundary() {
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }
    inside_walls() {
        for (let i = 0; i < walls.length; ++i) {
            if (
                !(
                    this.x > walls[i].x - walls[i].d && this.x < walls[i].x + walls[i].d
                ) &&
                this.y > walls[i].y &&
                this.y < walls[i].y + walls[i].h
            ) {
                health = constrain(health - 1, 0, 100);
                if (health === 0) gameover = true;
                return true;
            }
            if (
                !gameover &&
                dist(this.x, this.y, walls[i].x, walls[i].y + walls[i].h / 2) < this.r
            ) {
                score++;
                health = constrain(health + 0.1, 0, 100);
            }
        }
        return false;
    }
    display() {
        strokeWeight(1);
        stroke(255);
        fill(55, 255, 0, 150);
        if (this.inside_walls()) fill(255, 0, 0, 200);
        circle(this.x, this.y, this.d);
    }
    work() {
        // this.x = mouseX;
        // this.y = mouseY;
        this.boundary();
        this.display();
    }
}
