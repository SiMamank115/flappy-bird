export class Block {
    constructor(x, y, height, width, callback, animation) {
        this.velocity = createVector(0, 0);
        this.old = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.position = createVector(x, y);
        if (typeof height == "function") {
            callback = height;
            if (typeof width == "object") {
                animation = width;
            }
        }
        this.height = height;
        this.width = width;
        this.callback = callback;
        if (animation["idle"]) {
            this.idle = animation.idle;
            this.height = this.idle.collisionSize.height;
            this.width = this.idle.collisionSize.width;
            this.tick = {
                idle: 0,
            };
        }
    }
    display() {
        push();
        stroke(0).noFill().rectMode(RADIUS);
        if (this.idle) {
            let idle = this.idle;
            // rect(this.position.x, this.position.y, this.width * 0.5, this.height * 0.5);
            imageMode(CENTER);
            image(this.idle, this.position.x, this.position.y, this.idle.size.width, this.idle.size.height);
            if (idle.animation) {
                this.tick.idle += 1;
                this.tick.idle %= idle.animation.length;
            }
        } else {
            rect(this.position.x, this.position.y, this.width * 0.5, this.height * 0.5);
        }
        pop();
    }
    update() {
        this.velocity.add(this.acceleration);
        frameCount % 2 && (this.old = createVector(this.position.x, this.position.y));
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.callback(this);
    }
}
