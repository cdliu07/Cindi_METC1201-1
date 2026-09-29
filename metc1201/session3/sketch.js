/*
<><><><><><><><><><><><><><><><><><><><><>
	USING VARIABLES

	Introducing...
	- Data Types
	- Variables
	- Constants
	- Operators
	- mousePressed()
	- keyPressed()

	Press Mouse to change background color
<><><><><><><><><><><><><><><><><><><><><>
*/

//DECLARING GLOBAL VARIABLES:
//globally scoped variables declared outside of setup() and draw() can be used anywhere in sketch.

let num = 100;		//creates a variable called num, and assigns a value of 100, a Number data type.
let ellipseHeight = 50;	//creates a variable called ellipseHeight and assigns a value of 50;
let grow = 0.5;		//creates a variable called grow and assigns a value of 0.5;
let xLocation = 0;	//creates a variable called xLocation and assigns a value of 0;

//declaring variables for background color
let r = 0;	//red value, from 0 to 255
let g = 0;	//green value, from 0 to 255
let b = 0;	//blue value, from 0 to 255

//DECLARING GLOBAL CONSTANTS:
//unlike variables, constants cannot be reassigned after declaration. you cannot change its value after this point.
//like variables, globally scoped constants declared outside of setup() and draw() can be used anywhere.

const centerPosX=300;
const centerPosY=300;

function setup() //runs only once.
{
	createCanvas(800, 600);
	let example = 75; //QUESTION: will I be able to use this variable in draw()?
}

function draw() //draw runs forever, unless event function is called.
{
	background(r, g, b);	//fill screen with color defined by r, g, b variables.
	
	ellipse (mouseX / 2, mouseY - 200, num, ellipseHeight + 100);
	
	rectMode(CENTER);	//set rect mode to center, so x and y coordinates will be the center of the rectangle
	rect(mouseX, mouseY, grow, grow);

    ellipse(x, y, w, h)
	
	grow += 0.25;
    //grow = grow + 0.5;	//this is the same as the line above, but longer to write.s
    
}