let bird,
    blocks = [],
    sprite = {
        data: {},
        sheet: {},
    },
    imageData;

function preload() {
    imageData = loadJSON("/assets/data.json", (cb) => {
        let queue = Object.keys(cb);
        queue.forEach((e) => {
            texture.init(cb[e]);
        });
    });
}
function setup() {
    createCanvas(960, 540);
    bird = new Bird(100, 100, 2.5, {
        "bird-fly": texture.animations["bird-fly"],
        "bird-idle": texture.animations["bird-idle"],
        main: "bird-fly",
    });
    blocks.push(new Block(200,430,function(){},{
        "idle":texture.sheet["pipe-2"]
    }))
}
function draw() {
    background(255);
    blocks.forEach((e) => {
        !e.die && (e.display() || e.update());
    });
    bird.display();
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
