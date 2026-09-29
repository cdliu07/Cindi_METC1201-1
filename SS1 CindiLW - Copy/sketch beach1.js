// Cindi LW
// Beach
// My concept is a peaceful beach.
// This drawing shows a beach with the ocean, sand, sun, and shells.

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(135,206,235);
  //sun
  fill(255,220,50);
  noStroke();
  circle(650,120,100); 
  //ocean
  fill(50,150,220);
noStroke();

beginShape();
vertex(0,300);
quadraticVertex(100,270,200,300);
quadraticVertex(300,330,400,300);
quadraticVertex(500,270,600,300);
quadraticVertex(700,330,800,300);
vertex(800,600);
vertex(0,600);
endShape(CLOSE);
  //beach
  fill(238,214,175)
  triangle(0,600,800,600,800,350)
  // Shell
fill(255, 180, 190);
stroke(0);
strokeWeight(2);

ellipse(350, 520, 70, 45);

arc(335, 520, 20, 40, PI + HALF_PI, HALF_PI);
arc(350, 520, 20, 40, PI + HALF_PI, HALF_PI);
arc(365, 520, 20, 40, PI + HALF_PI, HALF_PI);
// Sand dots
fill(0);
noStroke();

circle(450, 500, 4);
circle(680, 480, 4);
circle(750, 530, 5);
circle(220, 550, 4);
circle(400, 570, 5);
circle(600, 550, 4);
 // Waves
 stroke(255);
 strokeWeight(3);
 noFill();

 arc(100, 330, 60, 15, PI, TWO_PI);
 arc(250, 345, 70, 15, PI, TWO_PI);
 arc(400, 325, 60, 15, PI, TWO_PI);
 arc(550, 345, 70, 15, PI, TWO_PI);
 arc(700, 325, 60, 15, PI, TWO_PI);
  // Seagulls
 stroke(0);
 strokeWeight(3);
 noFill();
 arc(200, 180, 60, 40, PI, TWO_PI);
 arc(260, 180, 60, 40, PI, TWO_PI);

 arc(400, 220, 60, 40, PI, TWO_PI);
 arc(460, 220, 60, 40, PI, TWO_PI);
}