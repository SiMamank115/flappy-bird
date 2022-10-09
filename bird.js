class Bird {
    constructor(x = 0, y = 0, m = 0, a = {}) {
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
        this.turn = "right";
        if (a["fly"]) this.fly = a.fly;
        if (a["idle"]) this.idle = a.idle;
    }
    jumping() {
        (this.jump = 10), (this.velocity.y = 0), (this.goJump = !1);
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
        frameCount % 2 && (this.old = createVector(this.position.x, this.position.y));
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    display() {
        this.fly.timeLine(0.25);
        this.idle.timeLine(0.05);
        let vy = this.velocity.y,
            rotation = (vy > 5 ? 5 : vy < -5 ? -5 : vy) * 4;
        push();
        stroke(0);
        fill(0);
        translate(this.position.x, this.position.y);
        scale(this.turn == "right" ? -1.5 : 1.5, 1.5);
        rotate(radians(-rotation));
        imageMode(CENTER);
        image(this.velocity.y != 0 ? this.fly.get(floor(this.fly.getTimeLine())) : this.velocity.x != 0 ? this.idle.get(round(this.idle.getTimeLine())) : this.idle.get(1), 0, 0);
        pop();
        this.fly.timeLine();
        this.idle.timeLine();
    }
    collision(block = new Block(), action = true) {
        let dir = {
                top: this.position.y - this.radius,
                left: this.position.x - this.radius,
                bottom: this.position.y + this.radius,
                right: this.position.x + this.radius,
            },
            dirBlock = {
                top: block.position.y - block.height * 0.5,
                left: block.position.x - block.width * 0.5,
                bottom: block.position.y + block.height * 0.5,
                right: block.position.x + block.width * 0.5,
            },
            dirOld = {
                top: this.old.y - this.radius,
                left: this.old.x - this.radius,
                bottom: this.old.y + this.radius,
                right: this.old.x + this.radius,
            },
            dirBlockOld = {
                top: block.old.y - block.height * 0.5,
                left: block.old.x - block.width * 0.5,
                bottom: block.old.y + block.height * 0.5,
                right: block.old.x + block.width * 0.5,
            },
            // collide = !(r1.x>r2.x+r2.w || r1.x+r1.w<r2.x || r1.y>r2.y+r2.h || r1.y+r1.h<r2.y),
            collide = !(dir.left > dirBlock.right || dir.right < dirBlock.left || dir.top > dirBlock.bottom || dir.bottom < dirBlock.top),
            velocity = this.velocity,
            blockVelocity = block.velocity;
        if (!action) return { collide, velocity };
        if (collide) {
            // top
            if (dir.top < dirBlock.bottom && dirOld.top > dirBlockOld.bottom) {
                this.position.y = dirBlock.bottom + this.radius + 0.1;
                this.velocity.y = blockVelocity.y;
            }
            // bottom
            if (dir.bottom > dirBlock.top && dirOld.bottom < dirBlockOld.top) {
                this.position.y = dirBlock.top - this.radius - 0.1;
                this.velocity.y = 0;
            }
            // left
            if (dir.left < dirBlock.right && dirOld.left > dirBlockOld.right) {
                this.position.x = dirBlock.right + this.radius + 0.1;
            }
            // right
            if (dir.right > dirBlock.left && dirOld.right < dirBlockOld.left) {
                this.position.x = dirBlock.left - this.radius - 0.1;
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
    turning(left = true) {
        if (!left) {
            this.acceleration.add(createVector(1, 0));
            this.turn = "right";
        } else {
            this.acceleration.add(createVector(-1, 0));
            this.turn = "left";
        }
    }
}
