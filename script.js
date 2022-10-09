function setup() {
    createCanvas(960, 540);
    window.bird = new Bird(100, 100, 2.5);
    window.testingBlock = new Block(-30, 500, 100);
    testingBlock.acceleration.x = 1;
}
function draw() {
    background(255);
    bird.display();
    testingBlock.display();
    
    testingBlock.update();
    bird.update();
    bird.applyGravity();
    bird.checkEdges();
    bird.goJump == true && bird.jumping();
    bird.collision(testingBlock);
    events();
    document.querySelector("p#vel").innerHTML = bird.velocity.x + "<br>" + bird.velocity.y;
    // document.querySelector("p#vel").innerHTML = bird.position.y + "<br>" + bird.old.y;
    document.querySelector("p#col").textContent = bird.collision(testingBlock, false).collide;
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
    if(keyCode == 87 || keyCode == 32) bird.goJump = !![]
}
function mousePressed() {
    bird.goJump = !![];
}
