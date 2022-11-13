import { Animation, animate } from "./animate.js";
import { Bird } from "./bird.js";
import { Block } from "./block.js";
import { texture } from "./textureInitialize.js";
let imageData,
    fn = function () {};
window.blocks = [];
window.bird;
window.textures = {
    sheet: {},
    animations: {},
    list: [],
};
window.preload = () => {
    imageData = loadJSON("/assets/data.json", (cb) => {
        let queue = Object.keys(cb);
        queue.forEach((e) => {
            texture.init(cb[e], textures);
        });
    });
};
window.setup = () => {
    // noLoop();
    createCanvas(960, 540);
    let fly = animate();
    window.bird = new Bird(100, 100, 2.5, {
        "bird-fly": textures.animations["bird-fly"],
        "bird-walk": textures.animations["bird-walk"],
        "bird-idle": textures.sheet["bird-idle"],
    });
    blocks.push(
        new Block(200, 300, 0, 0, function () {}, {
            idle: textures.sheet["pipe-2"],
        })
    );
};
window.draw = () => {
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
    document.querySelector("p#col").innerHTML = round(bird.position.x) + "<br>" + round(bird.position.y);
};
const events = () => {
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
};
window.keyPressed = () => {
    if (keyCode == 87 || keyCode == 32) bird.goJump = !![];
};
window.mousePressed = () => {
    bird.goJump = !![];
};
function pipeGen() {
    let indexes = blocks.length;
    let cb = (e) => {
            if (e.position.x < -width + 60) {
                e.die = !![];
            }
        },
        upperbottom = random(0, height - 100),
        upperPipe = new Block(width + 60, upperbottom - height * 0.5, height, 60, cb, {
            idle: textures.sheet["dirt"],
        }),
        lowerPipe = new Block(width + 60, upperbottom + 100 + height * 0.5, height, 60, cb, {
            idle: textures.sheet["dirt"],
        });
    blocks.push(upperPipe);
    blocks.push(lowerPipe);
    let speed = 4;
    upperPipe.acceleration.x = -speed;
    lowerPipe.acceleration.x = -speed;
}
