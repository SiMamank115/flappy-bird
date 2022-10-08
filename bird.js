class Bird {
    constructor(x, y, m) {
        this.position = createVector(x, y);
        this.old = createVector(x, y);
        this.mass = m;
        this.gravity = createVector(0, 0.2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.radius = this.mass * 8;
        this.width = this.radius * 2;
        this.jump = 0;
        this.goJump = false;
    }
    jumping() {
        this.jump = 10;
        this.velocity.y = 0;
        this.goJump = false;
    }
    update() {
        this.velocity.x > 4 && (this.velocity.x = 4);
        this.velocity.x < -4 && (this.velocity.x = -4);
        if (this.jump > 0) {
            this.jump > 2 ? (this.jump /= 2) : (this.jump = 0);
            this.acceleration.add(createVector(0, -this.jump));
        }
        let turnBrake = this.velocity.x;
        if (turnBrake > 0) {
            turnBrake > 0.9 ? (turnBrake *= 0.1) : turnBrake;
            this.acceleration.add(createVector(-turnBrake, 0));
        }
        if (turnBrake < 0) {
            turnBrake < -0.9 ? (turnBrake *= 0.1) : turnBrake;
            this.acceleration.add(createVector(-turnBrake, 0));
        }
        this.velocity.add(this.acceleration);
        (frameCount % 2 && (this.old = createVector(this.position.x, this.position.y)));
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    display() {
        let vy = this.velocity.y,
            rotation = (vy > 5 ? 5 : vy < -5 ? -5 : vy) * 14;
        push();
        stroke(0)
            .fill(0)
            .translate(this.position.x, this.position.y)
            .rotate(radians(rotation))
            .rectMode(RADIUS)
            .rect(0, 0, this.radius, this.radius, 0, 10, 10, 0)
            .pop();
    }
    collision(pipe = new Pipe(), action = true) {
        let dir = {
                top: this.position.y - this.radius,
                left: this.position.x - this.radius,
                bottom: this.position.y + this.radius,
                right: this.position.x + this.radius,
            },
            dirPipe = {
                top: pipe.position.y - pipe.height * 0.5,
                left: pipe.position.x - pipe.width * 0.5,
                bottom: pipe.position.y + pipe.height * 0.5,
                right: pipe.position.x + pipe.width * 0.5,
            },
            dirOld = {
                top: this.old.y - this.radius,
                left: this.old.x - this.radius,
                bottom: this.old.y + this.radius,
                right: this.old.x + this.radius
            },
            dirPipeOld = {
                top: pipe.old.y - pipe.height * 0.5,
                left: pipe.old.x - pipe.width * 0.5,
                bottom: pipe.old.y + pipe.height * 0.5,
                right: pipe.old.x + pipe.width * 0.5,
            },
            // collide = !(r1.x>r2.x+r2.w || r1.x+r1.w<r2.x || r1.y>r2.y+r2.h || r1.y+r1.h<r2.y),
            collide = !(dir.left > dirPipe.right || dir.right < dirPipe.left || dir.top > dirPipe.bottom || dir.bottom < dirPipe.top),
            velocity = this.velocity,
            pipeVelocity = pipe.velocity;
        if (!action) return { collide, velocity };
        if (collide) {
            // top
            if (dir.top < dirPipe.bottom && dirOld.top > dirPipeOld.bottom) {
                this.position.y = dirPipe.bottom + this.radius + .1;
                this.velocity.y = pipeVelocity.y;
            }
            // bottom
            if (dir.bottom > dirPipe.top && dirOld.bottom < dirPipeOld.top) {
                this.position.y = dirPipe.top - this.radius - .1;
                this.velocity.y = pipeVelocity.y;
            }
            // left
            if (dir.left < dirPipe.right && dirOld.left > dirPipeOld.right) {
                this.position.x = dirPipe.right + this.radius + .1;
                this.velocity.x = pipeVelocity.x;
            }
            // right
            if (dir.right > dirPipe.left && dirOld.right < dirPipeOld.left) {
                this.position.x = dirPipe.left - this.radius - .1;
                this.velocity.x = pipeVelocity.x;
            }
        }
        return;
    }
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }
    applyGravity() {
        if (this.velocity.y < 1) {
            this.acceleration.add(p5.Vector.mult(this.gravity, 2));
        } else {
            this.acceleration.add(this.gravity);
        }
    }
    checkEdges() {
        if (this.position.y > height - this.radius) {
            this.velocity.y = 0;
            this.position.y = height - this.radius;
        } else if (this.position.y < this.radius) {
            this.velocity.y = 0;
            this.position.y = this.radius;
        }
    }
    turning(right = true) {
        if (right) {
            this.acceleration.add(createVector(-1, 0));
        } else {
            this.acceleration.add(createVector(1, 0));
        }
    }
}
