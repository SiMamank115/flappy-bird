let bird,
    blocks = [],
    spritedataFly,
    spritedataIdle,
    spritesheetFly,
    spritesheetIdle,
    birdAnimation = []
    idleAnimation = [];
function preload() {
    spritedataFly = loadJSON("bird.json");
    spritedataIdle = loadJSON("idle.json");
    spritesheetFly = loadImage("/assets/fly.png");
    spritesheetIdle = loadImage("/assets/idle.png");
}
function setup() {
    createCanvas(960, 540);
    bird = new Bird(100, 100, 2.5);
    let frames = spritedataFly.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spritesheetFly.get(pos.x, pos.y, pos.w, pos.h);
        birdAnimation.push(img);
    }
    let frames2 = spritedataIdle.frames;
    for (let i = 0; i < frames2.length; i++) {
        let pos = frames2[i].position;
        let img = spritesheetIdle.get(pos.x, pos.y, pos.w, pos.h);
        idleAnimation.push(img);
    }
}
function draw() {
    background(255);
    bird.display();
    // testingBlock.display();
    // testingBlock.update();
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
    document.querySelector("p#vel").innerHTML = bird.velocity.x + "<br>" + bird.velocity.y;
    // document.querySelector("p#vel").innerHTML = bird.position.y + "<br>" + bird.old.y;
    // document.querySelector("p#col").textContent = bird.collision(testingBlock, false).collide;
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
