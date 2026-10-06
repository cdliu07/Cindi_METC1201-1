// Name: Cindi Liu
// Title: Rainy Day
// Theme: Weather
// Instructions: Watch the cloud and rain.
let cloud;
let rainY = 350;
let rainY2 = 340;
let startTime;
async function setup() {
  createCanvas(800, 600);

  cloud = await loadImage("cloud.png");
  startTime = millis();
}

function draw() 
{
  background(200, 220, 240);
 // Background clouds
 fill(255);
 noStroke();

 ellipse(100, 150, 80, 40);
 ellipse(140, 145, 100, 50);
 ellipse(180, 150, 80, 40);

 ellipse(600, 200, 90, 40);
 ellipse(640, 195, 110, 50);
 ellipse(690, 200, 80, 40);

  image(cloud, 200, 100, 400, 400);
  
  // Draw rain
if (millis() - startTime > 1000) {

  stroke(100, 150, 255);
  strokeWeight(3);

  line(270, rainY + 10, 270, rainY + 25);
  line(300, rainY, 300, rainY + 15);
  line(330, rainY + 20, 330, rainY + 35);
  line(360, rainY + 5, 360, rainY + 20);
  line(390, rainY + 15, 390, rainY + 30);
  line(420, rainY, 420, rainY + 15);
  line(450, rainY + 20, 450, rainY + 35);
  line(480, rainY + 5, 480, rainY + 20);
  line(510, rainY + 15, 510, rainY + 30);

  line(270, rainY2 + 10, 270, rainY2 + 25);
  line(300, rainY2, 300, rainY2 + 15);
  line(330, rainY2 + 20, 330, rainY2 + 35);
  line(360, rainY2 + 5, 360, rainY2 + 20);
  line(390, rainY2 + 15, 390, rainY2 + 30);
  line(420, rainY2, 420, rainY2 + 15);
  line(450, rainY2 + 20, 450, rainY2 + 35);
  line(480, rainY2 + 5, 480, rainY2 + 20);
  line(510, rainY2 + 15, 510, rainY2 + 30);

  rainY = rainY + 2;
  rainY2 = rainY2 + 2;

  if (rainY > height) {
    rainY = 350;
  }
  if (rainY2 > height) {
    rainY2 = 340;
  }
}
  fill(50);
 textSize(32);
 textAlign(CENTER);
  if (millis() - startTime < 1000) {
  text("Rainy Day", 400, 60);
} else {
  text("It's Raining!", 400, 60);
}
}