function setup() {
    createCanvas(960, 540);
    window.bird = new Bird(100, 100, 2.5);
    window.testingPipe = new Pipe(-30, 500, 100);
    testingPipe.acceleration.x = 1;
}
function draw() {
    background(255);
    bird.display();
    testingPipe.display();
    
    testingPipe.update();
    bird.update();
    bird.applyGravity();
    bird.checkEdges();
    bird.goJump == true && bird.jumping();
    bird.collision(testingPipe);
    events();
    document.querySelector("p#vel").innerHTML = bird.velocity.x + "<br>" + bird.velocity.y;
    // document.querySelector("p#vel").innerHTML = bird.position.y + "<br>" + bird.old.y;
    document.querySelector("p#col").textContent = bird.collision(testingPipe, false).collide;
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
