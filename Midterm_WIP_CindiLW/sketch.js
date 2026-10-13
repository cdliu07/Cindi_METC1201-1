

let bottle;
let cloud;

let cloudx1 = 20;
let cloudx2 = 520;
let cloudx3 = 90;
let cloudx4 = 600;

let score = 0;
let gamestate = "playing";
let missedrain = 0;
let watercount = 0;
let bottleFull = 5;

// Raindrop
let rainX;
let rainY;
let rainSpeed = 1.2;
let rainVisible = true;
let nextRainTime = 0;

// Bottle position
let bottleX = 400;
let bottleY = 500;

function setup() {
  createCanvas(800, 800);

  bottle = loadImage('bottle.png');
  cloud = loadImage('cloud.png');

  // Start the first raindrop
  rainX = random(280, 520);
  rainY = random(320, 340);
}

function draw() {
  // Gradient background
  let topColor = color(16, 67, 107);
  let bottomColor = color(0, 151, 169);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Game Over screen
  if (gamestate === "gameover") {
    fill(255);
    noStroke();
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2 - 30);

    textSize(24);
    text("Final Score: " + score, width / 2, height / 2 + 20);
    text("Click to play again", width / 2, height / 2 + 60);
    return;
  }

  // Full screen
  if (gamestate === "full") {
    fill(255);
    noStroke();
    textSize(48);
    textAlign(CENTER, CENTER);
    text("The bottle is full!", width / 2, height / 2);

    textSize(24);
    text("Click to play again", width / 2, height / 2 + 60);
    return;
  }

  // Score
  fill(255);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Missed: " + missedrain + "/5", 20, 50);

  // Moving small clouds
  image(cloud, cloudx1, 30, 130, 78);
  image(cloud, cloudx2, 80, 180, 108);
  image(cloud, cloudx3, 160, 200, 120);
  image(cloud, cloudx4, 150, 200, 120);

  // Main cloud
  image(cloud, 200, 50, 400, 400);

  // Move clouds
  cloudx1 += 0.5;
  cloudx2 -= 0.3;
  cloudx3 += 0.5;
  cloudx4 -= 0.5;

  // Reset cloud positions
  if (cloudx1 > width) {
    cloudx1 = -130;
  }

  if (cloudx2 < -180) {
    cloudx2 = width;
  }

  if (cloudx3 > width) {
    cloudx3 = -200;
  }

  if (cloudx4 < -200) {
    cloudx4 = width;
  }

  // Create the next raindrop
  if (!rainVisible && millis() > nextRainTime) {
    rainX = random(280, 520);
    rainY = random(320, 340);
    rainVisible = true;
  }

  // Draw one raindrop
  if (rainVisible) {
    noStroke();
    fill(100, 190, 255);

    // Round bottom
    ellipse(rainX, rainY + 10, 16, 20);

    // Pointed top
    triangle(
      rainX - 8, rainY + 5,
      rainX + 8, rainY + 5,
      rainX, rainY - 10
    );

    // Move the raindrop
    rainY += rainSpeed;

    // Check if the bottle catches the raindrop
    if (
      rainX >= bottleX - 50 &&
      rainX <= bottleX + 50 &&
      rainY + 20 >= bottleY - 100 &&
      rainY - 10 <= bottleY + 100
    ) {
      score++;
      watercount++;

      rainVisible = false;
      nextRainTime = millis() + 800;
    }
    // Check if the bottle is full
    if (watercount >= bottleFull) {
      gamestate = "full";
    }

    // If the raindrop misses the bottle
    else if (rainY > height) {
      rainVisible = false;
      missedrain++;

      if (missedrain >= 5) {
        gamestate = "gameover";
      }

      nextRainTime = millis() + 800;
    }
  }

  // Bottle follows the mouse
  bottleX = constrain(mouseX, 75, width - 75);
  bottleY = constrain(mouseY, 100, height - 100);

  image(
    bottle,
    bottleX - 75,
    bottleY - 100,
    150,
    200
  );
}

// Restart the game when the mouse is clicked
function mousePressed() {
  if (gamestate === "gameover" || gamestate === "full") {
    gamestate = "playing";
    score = 0;
    missedrain = 0;
    watercount = 0;
    rainVisible = true;
    rainX = random(280, 520);
    rainY = random(320, 340);
    nextRainTime = 0;

    bottleX = 400;
    bottleY = 500;

    cloudx1 = 20;
    cloudx2 = 520;
    cloudx3 = 90;
    cloudx4 = 600;
  }
}


