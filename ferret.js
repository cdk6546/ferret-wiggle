let width = 500;
let height = 500;
let centerWidth = width / 2;
let centerHeight = height / 2;
let numberSegments = 1;
let segmentWidth = 50;
let secondaryWidth = segmentWidth * 0.75;
let segmentHeight = 35;


let segCoordCenter;
let segCoordRight;
let segCoordLeft;
let segCoordTail;
let segCoordNeck;
let segCoordHead;
let segFrontFoot;
let segBackFoot;


let canvasCenter;
let distance = 0;
let wiggle = 0;

let branchVectors = [];
let nodeDistanceX = 5;
let bodyGravity = 10;
let tailGravity = 15;
let neckGravity = 12;
let direction;

function preload(){
    img = loadImage('ferret.png');
}

function setup(){
    let cnv = createCanvas(width, height);
    fill(color('#8C6653'));
    noStroke();

    // center node
    segCoordCenter = createVector(centerWidth,centerHeight);
    canvasCenter = segCoordCenter;
    // lets make two more
    
    segCoordRight = createVector(segCoordCenter.x + segmentWidth + nodeDistanceX, segCoordCenter.y);
    branchVectors.push(segCoordRight);
    console.log(segCoordCenter.x);
    segCoordLeft = createVector(segCoordCenter.x - secondaryWidth - nodeDistanceX, segCoordCenter.y);

    // tail!
    segCoordTail = createVector(segCoordRight.x  + secondaryWidth + nodeDistanceX, segCoordCenter.y);

    // neck
    segCoordNeck = createVector(segCoordLeft.x  - segmentWidth - nodeDistanceX, segCoordCenter.y);

    // head
    segCoordHead = createVector(segCoordNeck.x - segmentWidth - nodeDistanceX, segCoordCenter.y);
    img.resize(100, 100);

}

function draw(){
    background(220);
    currentPos = createVector(mouseX, mouseY);

    rect(segCoordCenter.x, segCoordCenter.y, segmentWidth, segmentHeight, 5);
    rect(segCoordRight.x, segCoordRight.y, secondaryWidth, segmentHeight, 5);
    rect(segCoordLeft.x, segCoordLeft.y, secondaryWidth, segmentHeight, 5);
    
    push();
    fill('#D7C2AE');
    rect(segCoordRight.x + (secondaryWidth / 4) + 20, segCoordRight.y + segmentHeight + 20, secondaryWidth, segmentHeight / 2, 5, 0, 0, 0);
    rect(segCoordLeft.x + (secondaryWidth / 4) - 20, segCoordLeft.y + segmentHeight + 15, secondaryWidth, segmentHeight / 2, 5, 0, 0, 0);
    pop();

    // rotating the tail upwards
    push();
    translate(segCoordTail.x + 10, segCoordTail.y + segmentHeight);
    rotate(radians(-20));
    triangle(0, 0, segmentWidth * 1.5, -segmentHeight / 2, 0, -segmentHeight);
    pop();


    // rotating the neck upwards
    push(); 
    translate(segCoordNeck.x + segmentWidth / 2, segCoordNeck.y + segmentHeight); 
    rotate(radians(55)); 
    rect(-secondaryWidth - 10, -segmentHeight - 5, segmentWidth - 10, segmentHeight, 5); 


    // putting the head onto the neck in the same coordinate plane
    rotate(radians(-55)); 
    image(img, -secondaryWidth - 25, -segmentHeight - 85);

    pop()


    distance = p5.Vector.dist(currentPos, segCoordCenter);
    if (distance < segmentWidth + wiggle && mouseIsPressed){
        segCoordCenter = createVector(mouseX - (segmentWidth/2), mouseY);

        // we need gravity
        direction = Math.sign(canvasCenter.y - segCoordCenter.y);

        segCoordRight = createVector(segCoordCenter.x + segmentWidth + nodeDistanceX, segCoordCenter.y + (bodyGravity * direction));
        segCoordLeft = createVector(segCoordCenter.x - secondaryWidth - nodeDistanceX, segCoordCenter.y + (bodyGravity * direction));
        segCoordTail = createVector(segCoordRight.x  + secondaryWidth + nodeDistanceX, segCoordCenter.y + (tailGravity * direction));
        segCoordNeck = createVector(segCoordLeft.x  - segmentWidth - nodeDistanceX, segCoordCenter.y + (neckGravity * direction))


        wiggle = width/2;
    }
    else {
        wiggle = 0;
    }
}
