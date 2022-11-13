export class Bird {
    constructor(x = 0, y = 0, m = 0, a = {}) {
        this.position = createVector(x, y);
        this.old = createVector(x, y);
        this.mass = m;
        this.gravity = createVector(0, 0.2125);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.jump = 0;
        this.goJump = false;
        this.turn = "right";
        this.animation = {
            "bird-fly": a["bird-fly"] ? a["bird-fly"] : undefined,
            "bird-walk": a["bird-walk"] ? a["bird-walk"] : undefined,
            "bird-idle": a["bird-idle"] ? a["bird-idle"] : undefined,
        };
        this.tick = {
            fly: 0,
            walk: 0,
        };
        if (this.animation["bird-idle"]) {
            this.height = this.animation["bird-idle"].collisionSize.height;
            this.radiusHeight = this.animation["bird-idle"].collisionSize.height * 0.5;
            this.width = this.animation["bird-idle"].collisionSize.width;
            this.radius = this.animation["bird-idle"].collisionSize.width * 0.5;
        }
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
        let vy = this.velocity.y,
            rotation = (vy > 5 ? 5 : vy < -5 ? -5 : vy) * 4;

        push();
        stroke(0).rectMode(RADIUS);
        noFill();
        translate(this.position.x, this.position.y);
        scale(this.turn == "right" ? -1 : 1, 1);
        imageMode(CENTER);
        if (!this.animation["bird-fly"] || !this.animation["bird-walk"]) {
            rect(0, 0, this.width * 0.5, this.height * 0.5);
        } else {
            rotate(radians(-rotation));
            let fly = this.animation["bird-fly"],
                walk = this.animation["bird-walk"],
                idle = this.animation["bird-idle"];
            image(this.velocity.y != 0 ? fly.get(floor(this.tick.fly)) : this.velocity.x != 0 ? walk.get(round(this.tick.walk)) : idle, 0, 0, idle.size.width, idle.size.height);
            this.tick.fly += 1;
            this.tick.fly %= fly.animation.length;
            this.tick.walk += 1;
            this.tick.walk %= walk.animation.length;
        }
        pop();
    }
    collision(block = new Block(), action = true) {
        let dir = {
                top: this.position.y - this.radiusHeight,
                left: this.position.x - this.radius,
                bottom: this.position.y + this.radiusHeight,
                right: this.position.x + this.radius,
            },
            dirBlock = {
                top: block.position.y - block.height * 0.5,
                left: block.position.x - block.width * 0.5,
                bottom: block.position.y + block.height * 0.5,
                right: block.position.x + block.width * 0.5,
            },
            dirOld = {
                top: this.old.y - this.radiusHeight,
                left: this.old.x - this.radius,
                bottom: this.old.y + this.radiusHeight,
                right: this.old.x + this.radius,
            },
            dirBlockOld = {
                top: block.old.y - block.height * 0.5,
                left: block.old.x - block.width * 0.5,
                bottom: block.old.y + block.height * 0.5,
                right: block.old.x + block.width * 0.5,
            },
            collide = !(dir.left > dirBlock.right || dir.right < dirBlock.left || dir.top > dirBlock.bottom || dir.bottom < dirBlock.top),
            velocity = this.velocity,
            blockVelocity = block.velocity;
        if (!action) return { collide, velocity };
        // console.log(dir.right , dirBlock.left);
        // console.log(dir.left > dirBlock.right , dir.right < dirBlock.left , dir.top > dirBlock.bottom , dir.bottom < dirBlock.top);
        if (collide) {
            // stairs
            if (dir.bottom == dirBlock.top || (dir.bottom > dirBlock.top && dir.bottom - 1 < dirBlock.top)) {
                this.position.y = dirBlock.top - this.radiusHeight - 0.1;
                this.velocity.y > 0 ? (this.velocity.y = 0) : "";
                return this.collision(block, action);
            }
            // top
            if (dir.top < dirBlock.bottom && dirOld.top > dirBlockOld.bottom) {
                this.position.y = dirBlock.bottom + this.radius + 0.1;
                this.velocity.y = blockVelocity.y;
            }
            // bottom
            if (dir.bottom > dirBlock.top && dirOld.bottom < dirBlockOld.top) {
                this.position.y = dirBlock.top - this.radiusHeight - 0.1;
                this.velocity.y = 0;
            }
            // left
            if (dir.left < dirBlock.right && dirOld.left > dirBlockOld.right) {
                this.position.x = dirBlock.right + this.radius + 0.1;
            }
            // right
            if (dir.right > dirBlock.left && dirOld.right < dirBlockOld.left) {
                this.position.x = dirBlock.left - this.radius - 0.1;
                // console.log({ dir, dirBlock, dirOld, dirBlockOld });
                // noLoop();
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
        if (this.position.y > height - this.radiusHeight) {
            this.velocity.y = 0;
            this.position.y = height - this.radiusHeight;
        } else if (this.position.y < this.radiusHeight) {
            this.velocity.y = 0;
            this.position.y = this.radiusHeight;
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
