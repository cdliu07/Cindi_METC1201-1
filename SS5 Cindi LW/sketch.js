//Move your mouse near the stars to make them glow.
//Click to create a new star.
//Press SPACE to change the star colors.


let stars = [];

let starColors = [
  [255, 255, 255],
  [185, 200, 255],
  [255, 201, 242],
  [255, 232, 163]
];

let colorIndex = 0;
let smallStars = [];

function setup() {
  createCanvas(800, 800);

  // main stars
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);
    let s = random(3, 7);

    stars.push({ x: x, y: y, size: s });
  }

  // Create small background stars
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);

    smallStars.push({ x: x, y: y });
  }
}

function draw() {
  background(12, 12, 45);

  //  moon
  fill(255, 240, 190);
  noStroke();
  ellipse(650, 130, 100, 100);

  //  draw main stars
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    let d = dist(mouseX, mouseY, s.x, s.y);

    // Change star size when mouse is nearby
    if (d < 80) {
      fill(
        starColors[colorIndex][0],
        starColors[colorIndex][1],
        starColors[colorIndex][2]
      );
      ellipse(s.x, s.y, s.size + 12);
    } else {
      fill(
        starColors[colorIndex][0],
        starColors[colorIndex][1],
        starColors[colorIndex][2]
      );
      ellipse(s.x, s.y, s.size);
    }
  }

  //  small background stars
  for (let i = 0; i < smallStars.length; i++) {
    fill(180, 190, 255, 120);
    ellipse(smallStars[i].x, smallStars[i].y, 2, 2);
  }

  // Instructions
  fill(255);
  textSize(16);
  text("Press SPACE to change colors", 20, 775);
}

// Click to create a new star
function mousePressed() {
  stars.push({
    x: mouseX,
    y: mouseY,
    size: random(4, 9)
  });
}

// Press SPACE to change colors
function keyPressed() {
  if (key === " ") {
    colorIndex = colorIndex + 1
    starColors.length;
  }
}