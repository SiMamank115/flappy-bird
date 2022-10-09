let bird,
    blocks = [],
    sprite = {
        data:{},
        sheet:{}
    }

function preload() {
    sprite.data.fly = loadJSON("bird.json");
    sprite.data.idle = loadJSON("idle.json");
    sprite.sheet.fly = loadImage("/assets/fly-small.png");
    sprite.sheet.idle = loadImage("/assets/idle-small.png");
    sprite.sheet.pipe = [];
    sprite.sheet.pipe[0] = loadImage("/assets/pipe-2.png");
    blocks.push(new Block(100, 350, 0, 200));
    blocks.push(new Block(400, 430, 220, 70,undefined,{idle:new Animate(sprite.sheet.pipe[0])}));
}
function setup() {
    createCanvas(960, 540);
    bird = new Bird(100, 100, 2.5, {
        idle: new Animate(sprite.sheet.idle, sprite.data.idle),
        fly: new Animate(sprite.sheet.fly, sprite.data.fly),
    });
}
function draw() {
    background(255);
    bird.display();
    blocks.forEach((e) => {
        !e.die && (e.display() || e.update());
    });
    bird.update();
    bird.applyGravity();
    bird.checkEdges();
    bird.goJump == true && bird.jumping();
    // bird.collision(testingBlock);
    blocks.forEach((e) => {
        !e.die && bird.collision(e);
    });
    events();
    document.querySelector("p#vel").innerHTML = round(bird.velocity.x) + "<br>" + round(bird.velocity.y);
    // document.querySelector("p#vel").innerHTML = bird.position.y + "<br>" + bird.old.y;
    document.querySelector("p#col").textContent = "";
}
function events() {
    if (keyIsDown(87)) {
        // atas
    }
    if (keyIsDown(83)) {
        // bawah
    }
    if (keyIsDown(65)) {
        bird.turning(!![]);
    }
    if (keyIsDown(68)) {
        // kanan
        bird.turning(![]);
    }
}
function keyPressed() {
    if (keyCode == 87 || keyCode == 32) bird.goJump = !![];
}
function mousePressed() {
    bird.goJump = !![];
}
function pipeGen() {
    let indexes = blocks.length;
    let cb = (e) => {
            if (e.position.x < -width + 60) {
                e.die = !![];
            }
        },
        upperbottom = random(0, height - 100),
        upperPipe = new Block(width + 60, upperbottom - height * 0.5, height, 60, cb),
        lowerPipe = new Block(width + 60, upperbottom + 100 + height * 0.5, height, 60, cb);
    blocks.push(upperPipe);
    blocks.push(lowerPipe);
    let speed = 4;
    upperPipe.acceleration.x = -speed;
    lowerPipe.acceleration.x = -speed;
}
