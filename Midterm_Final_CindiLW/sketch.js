//Name: CINDILIUWU
//work name: Rain day
// Move your mouse to catch the raindrops in the bottle
// If you miss three drop, the game is over
// Catch 3 drops to fill one bottle
// Fill 4 bottles to win

let bottle;
let cloud;

let bottleimage = []; 

// Cloud positions
let cloudx1 = 20;
let cloudx2 = 520;
let cloudx3 = 90;
let cloudx4 = 600;

let score = 0; 
let gamestate = "start";
let missedrain = 0;

let watercount = 0; // Water drops in the current bottle
let bottleFull = 3; 

let completedBottles = 0; // Counts completed bottles
let totalBottles = 4; 

// Raindrop variables
let rainX;
let rainY;
let rainSpeed = 4; // Starting raindrop speed
let speedIncrease = 5; // Speed increase after each bottle
let rainVisible = true;
let nextRainTime = 0; // Time for the next raindrop

let bottleX = 300;
let bottleY = 600;

function setup() {
  createCanvas(800, 800);

  bottleimage[0] = loadImage("bottle.png"); // Empty bottle
  bottleimage[1] = loadImage("bottle01.PNG"); // Bottle with some water
  bottleimage[2] = loadImage("bottle02.PNG"); // Bottle with more water
  bottleimage[3] = loadImage("bottle03.PNG"); // Full bottle

  cloud = loadImage("cloud.png");

  resetRain(); 
}

function draw() {
  // Draw the gradient background
  let dark = completedBottles;

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

  // Display the score and missed drops
  stroke(0, 100, 255);

  // Display the clouds
  image(cloud, cloudx1, 30, 130, 78);
  image(cloud, cloudx2, 80, 180, 108);
  image(cloud, cloudx3, 160, 200, 120);
  image(cloud, cloudx4, 150, 200, 120);
  image(cloud, 200, 50, 400, 400);


  // Move the clouds
  cloudx1 += 0.5;
  cloudx2 -= 0.3;
  cloudx3 += 0.5;
  cloudx4 -= 0.5;

  // Move clouds back when they leave the canvas
  if (cloudx1 > width) cloudx1 = -130;
  if (cloudx2 < -180) cloudx2 = width;
  if (cloudx3 > width) cloudx3 = -200;
  if (cloudx4 < -200) cloudx4 = width;

  stroke(0, 100, 255);
 strokeWeight(3);
 fill(255);
  textSize(24);
 textAlign(LEFT, TOP);

 text("Score: " + score, 20, 20);
 text("Missed: " + missedrain + "/3", 20, 50);
 text("Bottles: " + completedBottles + "/4", 20, 80);

 noStroke(); // Turn off the outline for the rest of the game
  // Display completed bottles in the top-left corner
  for (let i = 0; i < completedBottles; i++) {
    image(bottleimage[3], 20 + i * 45, 110, 35, 47);
  }

  // Create another raindrop after a short wait
  if (!rainVisible && millis() > nextRainTime) {
    resetRain();
  }

  // Draw and move the raindrop
  if (rainVisible) {
    noStroke();
    fill(100, 190, 255);

    // Bottom of the raindrop
    ellipse(rainX, rainY + 10, 16, 20);

    // Top of the raindrop
    triangle(
      rainX - 8, rainY + 5,
      rainX + 8, rainY + 5,
      rainX, rainY - 10
    );

    // Move the raindrop according to the current speed
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

      // Check if the current bottle is full
      if (watercount >= bottleFull) {
        completedBottles++;

        // Increase the raindrop speed after each bottle
        rainSpeed += 5;

        // Check if all 4 bottles are full
        if (completedBottles >= totalBottles) {
          gamestate = "full";
        } else {
          // Start filling the next bottle
          watercount = 0;
        }
      }
    } else if (rainY > height) {
      // Check if the raindrop falls off the screen
      rainVisible = false;
      missedrain++;

      // End the game after three missed drops
      if (missedrain >= 3) {
        gamestate = "gameover";
      }

      nextRainTime = millis() + 800;
    }
  }

  
  bottleX = constrain(mouseX, 75, width - 75);

  // Display the current bottle water level
  image(
    bottleimage[watercount],
    bottleX - 75,
    bottleY - 100,
    150,
    200
  );
}

// Create a new raindrop at a random position
function resetRain() {
  rainX = random(280, 520);
  rainY = random(320, 340);
  rainVisible = true;
}

// Display the end screen and final score
function showEndScreen(message) {
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(48);
  text(message, width / 2, height / 2 - 30);

  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 + 20);

  text("Bottles Completed: " + completedBottles + "/4",
       width / 2, height / 2 + 50);

  text("Click to play again", width / 2, height / 2 + 90);
}

// Start or restart the game when the mouse is clicked
function mousePressed() {
  if (gamestate === "start") {
    gamestate = "playing";
    return;
  }

  if (gamestate === "gameover" || gamestate === "full") {
    score = 0;
    missedrain = 0;
    watercount = 0;
    completedBottles = 0;

    // Reset the game speed
    rainSpeed = 10;

    gamestate = "playing";

    // Reset the bottle position
    bottleX = 300;
    bottleY = 600;

    // Reset the cloud positions
    cloudx1 = 20;
    cloudx2 = 520;
    cloudx3 = 90;
    cloudx4 = 600;

    // Reset the raindrop
    nextRainTime = 0;
    resetRain();
  }
}