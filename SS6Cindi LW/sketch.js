//Name: Cindi Liu Wu
//Instructions:
//Click to create stars and connect them into constellations.
//Move the mouse near stars to make them glow.
//Press SPACE to change star colors.

let stars = [];

let starColors = [
  [255, 255, 255],
  [185, 200, 255],
  [255, 201, 242],
  [255, 232, 163]
];

let colorIndex = 0;
let smallStars = [];
let constellation = [];

function setup() {
  createCanvas(800, 800);

  // main stars
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);
    let s = random(3, 7);

    stars.push({ x: x, y: y, size: s });
  }

  //  background stars
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);

    smallStars.push({ x: x, y: y });
  }
}

function draw() {
  background(35, 45, 85);

  
 

  // constellation 
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

  //  main stars
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    let d = dist(mouseX, mouseY, s.x, s.y);

    // use to change star size when mouse is nearby
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

   fill(255, 240, 190);
  noStroke();
  ellipse(650, 130, 100, 100);
  
  fill(255);
  textSize(16);
  text("Click to create constellations", 20, 745);
  text("Press SPACE to change colors", 20, 775);
}

//  use tocreate a new star
function mousePressed() {
  stars.push({
    x: mouseX,
    y: mouseY,
    size: random(4, 9)
  });

  // Save the clicked star for constellation lines
  constellation.push({
    x: mouseX,
    y: mouseY
  });
}


function keyPressed() {

  if (key === " ") {
    colorIndex = (colorIndex + 1) % starColors.length;
  }
}
