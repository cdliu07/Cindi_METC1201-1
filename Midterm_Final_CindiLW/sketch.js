// Rainy Day Game
// Cindi Liu Wu
// Rules
// Catch blue rain to get points.
// Catching red rain loses 1 point.
// WIN: Fill 4 bottles in Normal Mode.
// LOSE: Miss 3 blue drops or catch 5 red drops.
// Infinite Mode: Keep playing for a high score.
let bottle;
let cloud;
let bottleimage = [];

// Cloud positions
let cloudx1 = 20;
let cloudx2 = 520;
let cloudx3 = 90;
let cloudx4 = 600;

// Game settings
let score = 0;
let gamestate = "start";
let missedrain = 0;
let fakeCaught = 0;
let infiniteMode = false;

let watercount = 0;
let bottleFull = 3;
let completedBottles = 0;
let totalBottles = 4;

// Normal blue rain
let rainX;
let rainY;
let rainSpeed = 4;
let rainVisible = true;
let nextRainTime = 0;

// Fake red rain
let fakeRainX;
let fakeRainY;
let fakeRainSpeed = 4;
let fakeRainVisible = true;
let nextFakeRainTime = 0;

// Bottle position
let bottleX = 300;
let bottleY = 600;

function setup() {
  createCanvas(800, 800);

  bottleimage[0] = loadImage("bottle.png");
  bottleimage[1] = loadImage("bottle01.PNG");
  bottleimage[2] = loadImage("bottle02.PNG");
  bottleimage[3] = loadImage("bottle03.PNG");

  cloud = loadImage("cloud.png");

  resetRain();
  resetFakeRain();
}

function draw() {
  // Background gradient
  let dark = Math.min(completedBottles, 4);

  let topColor = lerpColor(
    color(16, 67, 107),
    color(55, 55, 65),
    dark / 4
  );

  let bottomColor = lerpColor(
    color(0, 151, 169),
    color(35, 40, 45),
    dark / 4
  );

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Start screen
  if (gamestate === "start") {
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);

    textSize(52);
    text("Rainy Day", width / 2, height / 2 - 70);

    textSize(24);
    text("Catch the raindrops!", width / 2, height / 2);

    textSize(28);
    text("Click to Start", width / 2, height / 2 + 60);

    textSize(18);
    text("Press A for Infinite Mode", width / 2, height / 2 + 110);

    return;
  }

  // Game over screen
  if (gamestate === "gameover") {
    showEndScreen("Game Over!");
    return;
  }

  // Winning screen
  if (gamestate === "full") {
    showEndScreen("You Win!");
    return;
  }

  // Draw clouds
  image(cloud, cloudx1, 30, 130, 78);
  image(cloud, cloudx2, 80, 180, 108);
  image(cloud, cloudx3, 160, 200, 120);
  image(cloud, cloudx4, 150, 200, 120);
  image(cloud, 200, 50, 400, 400);

  // Move clouds
  cloudx1 += 0.5;
  cloudx2 -= 0.3;
  cloudx3 += 0.5;
  cloudx4 -= 0.5;

  // Reset cloud positions
  if (cloudx1 > width) cloudx1 = -130;
  if (cloudx2 < -180) cloudx2 = width;
  if (cloudx3 > width) cloudx3 = -200;
  if (cloudx4 < -200) cloudx4 = width;

  // Display game information
  noStroke();
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);

  text("Score: " + score, 20, 20);
  text("Missed: " + missedrain + "/3", 20, 50);
  text("Fake Rain: " + fakeCaught + "/5", 20, 80);

  if (infiniteMode) {
    text("Bottles: " + completedBottles, 20, 110);
    textSize(16);
    text("Infinite Mode (A to switch)", 20, 165);
  } else {
    text("Bottles: " + completedBottles + "/4", 20, 110);
    textSize(16);
    text("Normal Mode (A to switch)", 20, 165);
  }

  // Display completed bottles
  for (let i = 0; i < Math.min(completedBottles, 4); i++) {
    image(bottleimage[3], 20 + i * 45, 190, 35, 47);
  }

  // Create a new blue raindrop
  if (!rainVisible && millis() > nextRainTime) {
    resetRain();
  }

  // Draw and move blue rain
  if (rainVisible) {
    noStroke();
    fill(100, 190, 255);

    ellipse(rainX, rainY + 10, 16, 20);

    triangle(
      rainX - 8, rainY + 5,
      rainX + 8, rainY + 5,
      rainX, rainY - 10
    );

    rainY += rainSpeed;

    // Bottle catches blue rain
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

      // Check if bottle is full
      if (watercount >= bottleFull) {
        completedBottles++;

        rainSpeed += 1;
        fakeRainSpeed += 1;

        if (!infiniteMode && completedBottles >= totalBottles) {
          gamestate = "full";
        } else {
          watercount = 0;
        }
      }

    } else if (rainY > height) {
      // Blue rain missed
      rainVisible = false;
      missedrain++;

      if (missedrain >= 3) {
        gamestate = "gameover";
      }

      nextRainTime = millis() + 800;
    }
  }

  // Create a new red raindrop
  if (!fakeRainVisible && millis() > nextFakeRainTime) {
    resetFakeRain();
  }

  // Draw and move red fake rain
  if (fakeRainVisible) {
    noStroke();
    fill(255, 0, 0);

    ellipse(fakeRainX, fakeRainY + 10, 16, 20);

    triangle(
      fakeRainX - 8, fakeRainY + 5,
      fakeRainX + 8, fakeRainY + 5,
      fakeRainX, fakeRainY - 10
    );

    fakeRainY += fakeRainSpeed;

    // Bottle catches red fake rain
    if (
      fakeRainX >= bottleX - 50 &&
      fakeRainX <= bottleX + 50 &&
      fakeRainY + 20 >= bottleY - 100 &&
      fakeRainY - 10 <= bottleY + 100
    ) {
      score--;
      fakeCaught++;

      fakeRainVisible = false;
      nextFakeRainTime = millis() + 800;

      // Game over after catching 5 fake raindrops
      if (fakeCaught >= 5) {
        gamestate = "gameover";
      }

    } else if (fakeRainY > height) {
      // Missing red rain has no penalty
      fakeRainVisible = false;
      nextFakeRainTime = millis() + 800;
    }
  }

  // Move bottle
  bottleX = constrain(mouseX, 75, width - 75);

  // Display current bottle
  image(
    bottleimage[watercount],
    bottleX - 75,
    bottleY - 100,
    150,
    200
  );
}

// Create a new blue raindrop
function resetRain() {
  rainX = random(280, 520);
  rainY = random(260, 300);
  rainVisible = true;
}

// Create a new red raindrop
function resetFakeRain() {
  fakeRainX = random(280, 520);
  fakeRainY = random(260, 300);

  // Try a different horizontal position
  function resetFakeRain() {
  fakeRainX = random(280, 520);
  fakeRainY = random(260, 300);
  fakeRainVisible = true;
}

  fakeRainVisible = true;
}

// End screen
function showEndScreen(message) {
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(48);
  text(message, width / 2, height / 2 - 30);

  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 + 20);

  text(
    "Bottles Completed: " + completedBottles,
    width / 2,
    height / 2 + 50
  );

  text(
    "Fake Rain Caught: " + fakeCaught + "/5",
    width / 2,
    height / 2 + 80
  );

  text("Click to play again", width / 2, height / 2 + 120);
}

// Reset game data
function resetGame() {
  score = 0;
  missedrain = 0;
  fakeCaught = 0;
  watercount = 0;
  completedBottles = 0;

  rainSpeed = 4;
  fakeRainSpeed = 4;

  bottleX = 300;
  bottleY = 600;

  cloudx1 = 20;
  cloudx2 = 520;
  cloudx3 = 90;
  cloudx4 = 600;

  nextRainTime = 0;
  nextFakeRainTime = 0;

  resetRain();
  resetFakeRain();
}

// Press A to switch game mode
function keyPressed() {
  if (key === "a" || key === "A") {
    infiniteMode = !infiniteMode;
    resetGame();
    gamestate = "playing";
  }
}

// Start or restart game
function mousePressed() {
  if (gamestate === "start") {
    gamestate = "playing";
    return;
  }

  if (gamestate === "gameover" || gamestate === "full") {
    resetGame();
    gamestate = "playing";
  }
}
