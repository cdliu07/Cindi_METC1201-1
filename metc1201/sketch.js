//ellipse variables
let x = 0;
let y = 0;
let xMove = 0;
let yMove = 0;

//fill color variables
let r = 0;
let g = 255;
let b = 0;

function setup()
{
	createCanvas(700, 700);
	
	//start ellipse at center of canvas
	x = width / 2;
	y = height / 2;
}
function draw()
{
	background(75);
	fill(r, g, b);
	ellipse(x, y, 100, 100);if (x >= width || x <= 0)
	{
		xMove = -xMove; // reverse X movement direction
	}
	
	if (y >= height || y <= 0)
	{
		yMove = -yMove; //reverse Y movement direction
	}



	//update ellipse position
	x += xMove;
	y += yMove;
}   

function mousePressed()
{
	xMove = random(-10, 10);
	yMove = random(-10, 10);

    r = random(255);
    g = random(255);
    b = random(255);
}