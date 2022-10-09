class Block {
    constructor(x, y, h, dir) {
        this.dir = dir != "UP" || dir != "DOWN" ? "UP" : dir;
        this.position = createVector(x, y);
        this.height = h;
        this.width = 30;
        this.velocity = createVector(0, 0);
        this.old = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    }
    display() {
        push();
        stroke(0)
            .noFill()
            .rectMode(RADIUS)
            .rect(this.position.x, this.position.y, this.width * 0.5, this.height * 0.5)
            .pop();
    }
    update() {
        this.velocity.add(this.acceleration);
        (frameCount % 2 && (this.old = createVector(this.position.x, this.position.y)));
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
}
