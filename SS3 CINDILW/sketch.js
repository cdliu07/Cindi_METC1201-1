// Cindi LW
// Instructions: Click the sun to change from day to sunset to night.
// Click on the grass to grow random flowers.

// Variables
let flowers = [];
let timeOfDay = 0;

// Sky colors
let daySky;
let sunsetSky;
let nightSky;

function setup() {
  createCanvas(800, 600);

  daySky = color(190, 225, 250);
  sunsetSky = color(245, 160, 120);
  nightSky = color(30, 45, 90);
}

function draw() {
  // Change the background depending on the time of day
  if (timeOfDay === 0) {
    background(daySky);
  } else if (timeOfDay === 1) {
    background(sunsetSky);
  } else {
    background(nightSky);
  }

  // Grass
  noStroke();
  fill(120, 190, 100);
  rect(0, 400, width, 200);

  // Draw the sun or moon
  drawSkyObject();

  // Draw all flowers
  for (let flower of flowers) {
    drawFlower(
      flower.x,
      flower.y,
      flower.size,
      flower.flowerColor
    );
  }
}

// Draw the sun or moon depending on the time
function drawSkyObject() {
  noStroke();

  if (timeOfDay === 0) {
    // Day
    fill(255, 220, 80);
    circle(100, 100, 80);

  } else if (timeOfDay === 1) {
    // Sunset
    fill(255, 130, 70);
    circle(100, 250, 80);

  } else {
    // Night
    fill(245, 245, 200);
    circle(100, 100, 70);

    // Small stars
    fill(255);
    circle(250, 80, 4);
    circle(400, 130, 5);
    circle(600, 70, 4);
    circle(700, 180, 5);
    circle(500, 220, 3);
  }
}

// Mouse interaction
function mousePressed() {

  // Click the sun/moon area to change the time
  if (dist(mouseX, mouseY, 100, 100) < 50 ||
      dist(mouseX, mouseY, 100, 250) < 50) {

    if (timeOfDay === 0) {
      timeOfDay = 1;
    } else if (timeOfDay === 1) {
      timeOfDay = 2;
    } else {
      timeOfDay = 0;
    }

  // Click on the grass to grow a flower
  } else if (mouseY > 400) {

    let flowerSize = random(25, 55);
    let flowerColor;

    // Different areas create different random colors
    if (mouseX < 267) {

      flowerColor = color(
        random(200, 255),
        random(80, 150),
        random(80, 150)
      );

    } else if (mouseX < 533) {

      flowerColor = color(
        random(150, 220),
        random(80, 180),
        random(180, 255)
      );

    } else {

      flowerColor = color(
        random(180, 255),
        random(150, 230),
        random(50, 150)
      );
    }

    // Save the new flower
    flowers.push({
      x: mouseX,
      y: mouseY,
      size: flowerSize,
      flowerColor: flowerColor
    });
  }
}

// Draw one flower
function drawFlower(x, y, size, flowerColor) {

  // Stem
  stroke(60, 140, 70);
  strokeWeight(5);
  line(x, y, x, y + 50);

  // Leaves
  noStroke();
  fill(70, 160, 80);

  ellipse(x - 10, y + 25, 25, 12);
  ellipse(x + 10, y + 35, 25, 12);

  // Petals
  fill(flowerColor);

  circle(x - size * 0.3, y, size * 0.55);
  circle(x + size * 0.3, y, size * 0.55);
  circle(x, y - size * 0.3, size * 0.55);
  circle(x, y + size * 0.3, size * 0.55);

  // Flower center
  fill(255, 210, 50);
  circle(x, y, size * 0.35);
}