
/*
Name: Cindi Liu Wu
Title: Starry Sky
Instructions:
Click to create stars and connect them into constellations.
Move the mouse near stars to make them glow.
Press SPACE to change star colors.
Building from: Short Study #5
*/

// declare object arrays
let stars = [];
let smallStars = [];
let constellation = [];

// star colors
let starColors = [
  [255, 255, 255],
  [185, 200, 255],
  [255, 201, 242],
  [255, 232, 163]
];

let colorIndex = 0;

function setup() {
  createCanvas(800, 800);

  // create 80 main star objects
  for (let i = 0; i < 80; i++) {
    stars[i] = new Star(random(width), random(height), random(3, 7));
  }

  // create 30 small background stars
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);

    smallStars.push({ x: x, y: y });
  }
}

function draw() {
  background(35, 45, 85);

  // draw constellation lines
  stroke(180, 200, 255, 180);
  strokeWeight(1);

  for (let i = 0; i < constellation.length - 1; i++) {
    line(
      constellation[i].x,
      constellation[i].y,
      constellation[i + 1].x,
      constellation[i + 1].y
    );
  }

  noStroke();

  // display all main star objects
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }

  // display small background stars
  for (let i = 0; i < smallStars.length; i++) {
    fill(180, 190, 255, 120);
    ellipse(smallStars[i].x, smallStars[i].y, 2, 2);
  }

  // draw the moon
  fill(255, 240, 190);
  noStroke();
  ellipse(650, 130, 100, 100);

  // instructions on screen
  fill(255);
  textSize(16);
  text("Click to create constellations", 20, 745);
  text("Press SPACE to change colors", 20, 775);
}

// create a new star when mouse is clicked
function mousePressed() {
  let newStar = new Star(mouseX, mouseY, random(4, 9));

  // add the new object to both arrays
  stars.push(newStar);
  constellation.push(newStar);
}

// change star colors when SPACE is pressed
function keyPressed() {
  if (key === " ") {
    colorIndex = (colorIndex + 1) % starColors.length;
  }
}

// create the Star class
class Star {

  // constructor
  constructor(tempX, tempY, tempSize) {
    this.x = tempX;
    this.y = tempY;
    this.size = tempSize;
  }

  // display the star
  display() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    fill(
      starColors[colorIndex][0],
      starColors[colorIndex][1],
      starColors[colorIndex][2]
    );

    // make the star glow when mouse is nearby
    if (d < 80) {
      this.glow();
    } else {
      ellipse(this.x, this.y, this.size);
    }
  }

  // make a bigger star glow
  glow() {
    ellipse(this.x, this.y, this.size + 12);
  }
}
