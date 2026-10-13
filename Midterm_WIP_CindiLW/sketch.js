//Name: CINDILIUWU
//move your mouse to catch the raindrops in the bottle
//if you miss one drop, the game is over
//if you catch 3 drops, the bottle is full and you win
let bottle; 
let cloud; 

let bottleimage = []; // Stores bottle images with different water levels

// Cloud positions
let cloudx1 = 20;
let cloudx2 = 520;
let cloudx3 = 90;
let cloudx4 = 600;

let score = 0; // Counts caught raindrops
let gamestate = "start"; 
let missedrain = 0; // Counts missed raindrops

let watercount = 0; // Tracks the water level
let bottleFull = 3; // The bottle is full after 3 drops

// Raindrop variables
let rainX; 
let rainY; 
let rainSpeed = 1.2; // Raindrop speed 
let rainVisible = true;
let nextRainTime = 0; // Time for the next raindrop


let bottleX = 300; 
let bottleY = 600; 

function setup() {
  createCanvas(800, 800); 

  
  bottleimage[0] = loadImage("bottle.png"); // Empty bottle
  bottleimage[1] = loadImage("bottle01.PNG"); // Bottle with some water
  bottleimage[2] = loadImage("bottle02.PNG"); // Bottle with more water
  bottleimage[3] = loadImage("bottle03.PNG"); // Bottle at the last water level

  cloud = loadImage("cloud.png"); 

  resetRain(); // first raindrop
}

function draw() {
  
  let topColor = color(16, 67, 107); 
  let bottomColor = color(0, 151, 169); 

  // background one line at a time
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }

  
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

  
  if (gamestate === "gameover") {
    showEndScreen("Game Over!");
    return;
  }

  
  if (gamestate === "full") {
    showEndScreen("The bottle is full!");
    return;
  }

  // Display the score and missed drops
  noStroke();
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Missed: " + missedrain + "/1", 20, 50);


  image(cloud, cloudx1, 30, 130, 78);
  image(cloud, cloudx2, 80, 180, 108);
  image(cloud, cloudx3, 160, 200, 120);
  image(cloud, cloudx4, 150, 200, 120);
  image(cloud, 200, 50, 400, 400); // Main cloud

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

  // Create another raindrop after a short wait
  if (!rainVisible && millis() > nextRainTime) {
    resetRain();
  }

  // Draw and move the raindrop
  if (rainVisible) {
    noStroke();
    fill(100, 190, 255); 

    //  bottom of the raindrop
    ellipse(rainX, rainY + 10, 16, 20);

    // top of the raindrop
    triangle(
      rainX - 8, rainY + 5,
      rainX + 8, rainY + 5,
      rainX, rainY - 10
    );

    rainY += 4; // Move the raindrop downward

    // Check if the bottle catches the raindrop
    if (
      rainX >= bottleX - 50 &&
      rainX <= bottleX + 50 &&
      rainY + 20 >= bottleY - 100 &&
      rainY - 10 <= bottleY + 100
    ) {
      score++;
      watercount++; // Increase the water level

      rainVisible = false; 
      nextRainTime = millis() + 800; 

      // Check if the bottle is full
      if (watercount >= bottleFull) {
        gamestate = "full";
      }
    } else if (rainY > height) {
      // Check if the raindrop falls off the screen
      rainVisible = false;
      missedrain++; // Add one missed drop

      // End the game after one missed drop
      if (missedrain >= 1) {
        gamestate = "gameover";
      }

      nextRainTime = millis() + 800; // Wait before the next drop
    }
  }

  
  bottleX = constrain(mouseX, 75, width - 75);

  // Display the bottle image for the current water level
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
  text("Click to play again", width / 2, height / 2 + 60);
}
function mousePressed() {
  if (gamestate === "start") {
    gamestate = "playing";
    return;
  }

  if (gamestate === "gameover" || gamestate === "full") {
    score = 0;
    missedrain = 0;
    watercount = 0;
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
