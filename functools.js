class button {
    constructor(t, x, y, s) {
        this.x = x;
        this.y = y;
        this.text = t;
        this.s = s;
        textSize(this.s);
        this.w = textWidth(this.text) * 1.8;
        this.h = textAscent() * 1.4;
        this.activating = 0;
    }
    display() {
        rectMode(CENTER);
        strokeWeight(1);
        if (this.active > 0) {
            stroke(255);
            fill(255 - this.active, this.active, 69, 100);
        } else {
            stroke(100);
            fill(255, 0, 69, 100);
        }
        rect(this.x, this.y, this.w, this.h);
        erase();
        textSize(this.s);
        text(this.text, this.x, this.y);
        noErase();
        fill(255);
        if (this.active > 0)
            text(round(map(this.active, 0, 255, 5, 0)), this.x, this.y + this.h);
    }
    exe() { }
    work() {
        this.display();
        if (
            p.x > this.x - this.w / 2 &&
            p.x < this.x + this.w / 2 &&
            p.y > this.y - this.h / 2 &&
            p.y < this.y + this.h / 2
        )
            this.active += 2;
        else this.active = 0;
        if (this.active > 255) {
            this.active = 0;
            this.exe();
        }
    }
}
