class Block {
    constructor(x, y, h, w, callback = function (e) {}) {
        this.position = createVector(x, y);
        this.height = h;
        this.width = w;
        this.velocity = createVector(0, 0);
        this.old = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.callback = callback;
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
        frameCount % 2 && (this.old = createVector(this.position.x, this.position.y));
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.callback(this);
    }
}
