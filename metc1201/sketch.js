let tuna;
let goldfish;
let fish;

let currentTime=0;
let timer1=2000;
let timer2=4000;

async function setup()
 {
    createCanvas(700, 700);
    background(127);
	textAlign(CENTER);
	textSize(64);
}

function draw() 
{
    currentTime = millis();

	if(currentTime > timer2)
	{
		background(255,0,0);
		text('2', width / 2, height / 2);
	}
	else if(currentTime > timer1)
	{
		background(0,0,255);
		text('1', width / 2, height / 2);
	}
	else
	{
		background(127);
		text('0', width / 2, height / 2);
	}
	text(currentTime=""+int(mouseX), width / 2, height / 4);
}