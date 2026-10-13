let state = "pregame"; //storing our states as Strings 
let ellipseY = 0; //y position of ellipse

function setup() 
{
  createCanvas (500, 500);
  textAlign(CENTER);
  textSize(36);
}

function draw() 
{
  if (state == "pregame") 
	{
    preGame();
  } 
	else if (state == "game") 
	{
    game();
  } 
	else if (state == "game over") 
	{
    gameOver();
  }
	
  print(state);
}

function preGame() 
{
  background(0,255,0);
  text("clicks to start the game", width/2, height/2);
}

function game() 
{
background(0,0,255);
text("what a fun game", width/2, height/2);
ellipse(mouseX, ellipseY, 100,100);
ellipseY++;
if(ellipseY>height+50)
{
  state = "game over";
  ellipseY = 0;
}
} 

function gameOver() 
{
background(255,0,0);
text("game over", width/2, height/2);
text("click to restart", width/2, height/2 + 50);
} 

function mousePressed() 
{
  if (state == "pregame") 
	{
    state = "game";
  } 
	else if (state == "game over") 
	{
    state = "pregame";
  }
}