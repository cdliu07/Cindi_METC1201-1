let icecreams = [];  //declare object array 
icecreams.length = 100; //set array length

function setup() 
{
	createCanvas(500, 500);
	//initialize objects by calling the constructor with a for loop
	for (let i = 0; i < icecreams.length; i++) 
	{
		icecreams[i] = new Icecream(random(width), random(-200, height + 200), 65);
	}
}

function draw() 
{
	background(200);
	//call methods on the objects 
	//the for loop increments through each object in the array
	for (let i = 0; i < icecreams.length; i++) 
	{
		icecreams[i].display();
		icecreams[i].fall();
		icecreams[i].grow();
	}
}