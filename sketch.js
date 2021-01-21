var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var pinkCyclist,pinkCyclistImage,pinkCyclistfall,pinkCG
var yellowCyclist,yellowCyclistImage , yellowCyclistfall,yellowCG
var redCyclist,redCyclistImage,redCyclistfall,redCG
var obstacle1,obstacle1Image,obstacle2,obstacle2Image,obstacle3,
    obstacle3Image,obstacleGroup
var gameOver,gameOverImage
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
 
  pinkCyclistImage=loadAnimation("opponent1.png","opponent2.png")
  pinkCyclistfall=loadAnimation("opponent3.png")
  yellowCyclistImage=loadAnimation("opponent4.png","opponent5.png")
  yellowCyclistfall=loadAnimation("opponent6.png")
  redCyclistImage=loadAnimation("opponent7.png","opponent8.png")
  redCyclistfall=loadAnimation("opponent9.png")
  
  obstacle1Image=loadImage("obstacle1.png")
  obstacle2Image=loadImage("obstacle2.png")
  obstacle3Image=loadImage("obstacle3.png")
  
  gameOverImage=loadImage("gameOver.png")
  gameSound=loadSound("sound/bell.mp3")
  
}

function setup(){
  
createCanvas(600,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;
path.scale=0.3;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("racerRunning",mainRacerImg1); mainCyclist.addAnimation("racer",mainRacerImg2)
mainCyclist.scale=0.07;
mainCyclist.setCollider("circle",0,0,650)
  //mainCyclist.debug=true
  
  gameOver=createSprite(300,150,50,50)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.5
  gameOver.visible=false


  pinkCG = new Group();
  redCG = new Group();
  yellowCG = new Group(); 
   CG1 = new Group();
  CG2 = new Group();
  CG3 = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  
  if(gameState===PLAY)
  {
   
    textSize(20);
    textFont("Comic Sans MS")
  fill(255);
  text("Distance: "+ distance,350,30);
  distance = distance + Math.round(getFrameRate()/60);
 
   if(keyDown("space")){
     gameSound.play()
     
   } 
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    var cycle = Math.round(random(1,3));
    if (World.frameCount % 200 == 0){
    if (cycle == 1){
      pinkCyclists();
    }else if (cycle == 2){
      yellowCyclists();
    }else if(cycle == 3){
      redCyclists();
    }
    } 
      
 
  if (mainCyclist.isTouching(pinkCG)){
    gameState=END
    pinkCyclist.changeAnimation("pink",pinkCyclistfall)
  }
  if (mainCyclist.isTouching(yellowCG)){
    gameState=END
  yellowCyclist.changeAnimation("yellow",yellowCyclistfall)
  }
 if (mainCyclist.isTouching(redCG)){
    gameState=END
   redCyclist.changeAnimation("red",redCyclistfall)
  }
    if (mainCyclist.isTouching(CG1)){
    gameState=END 
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
  }
    if (mainCyclist.isTouching(CG2)){
    gameState=END 
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();  
  }
    if (mainCyclist.isTouching(CG3)){
    gameState=END
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();  
  }
     var obs = Math.round(random(1,3));
    if (World.frameCount % 400 == 0){
    if (obs == 1){
      obstacle1I();
    }else if (obs == 2){
      obstacle2I();
    }else if(obs == 3){
      obstacle3I();
    }
    } 
}
  if(gameState===END){
    textSize(25);
    textFont('Impact')
  fill("white");
  text("Press up arrow to retry ",180,190);
    gameOver.visible=true
    path.velocityX=0
    mainCyclist.changeAnimation("racer",mainRacerImg2)
    mainCyclist.velocityX=0
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
    yellowCG.setVelocityXEach(0);
  yellowCG.setLifetimeEach(-1);
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    CG1.setLifetimeEach(-1);
    CG1.setVelocityXEach(0);
    CG2.setLifetimeEach(-1);
    CG2.setVelocityXEach(0);
    CG3.setLifetimeEach(-1);
    CG3.setVelocityXEach(0);
    if(keyDown("UP_ARROW")) {
       console.log("hh")
  
     reset();
    }
     
  }
  
  
  
}

function pinkCyclists(){
  pinkCyclist=createSprite(1100,Math.round(random(50,250)),10,10)
  pinkCyclist.addAnimation("pinkCGAnimation",pinkCyclistImage)
   pinkCyclist.addAnimation("pink",pinkCyclistfall)
  pinkCyclist.scale=0.07
  pinkCyclist.lifetime=300;
  pinkCyclist.velocityX=-(6 + 2*distance/150);
  pinkCyclist.setCollider("circle",0,0,650)
  pinkCG.add(pinkCyclist)
  return pinkCyclist
}
function yellowCyclists(){
 yellowCyclist=createSprite(1100,Math.round(random(0,300)),10,10)
  yellowCyclist.addAnimation("yellowCGAnimation",yellowCyclistImage)
  yellowCyclist.addAnimation("yellow",yellowCyclistfall)
  
  yellowCyclist.scale=0.07
  yellowCyclist.lifetime=300;
  yellowCyclist.velocityX=-(6 + 2*distance/150);
  yellowCyclist.setCollider("circle",0,0,650)
  yellowCG.add(yellowCyclist)
  return yellowCyclist
  
  
}function redCyclists(){
  redCyclist=createSprite(1100,Math.round(random(0,300)),10,10)
  redCyclist.scale=0.07
  redCyclist.addAnimation("redCGAnimation",redCyclistImage)
  redCyclist.addAnimation("red",redCyclistfall)
  redCyclist.lifetime=300;
  redCyclist.velocityX=-(6 + 2*distance/150);
  redCyclist.setCollider("circle",0,0,650)
  redCG.add(redCyclist);
  return redCyclist
  
  
  
}
function obstacle1I(){
  var obstacle1=createSprite(1100,Math.round(random(0,300)),10,10)
  obstacle1.scale=0.07
  obstacle1.addImage(obstacle1Image);
  obstacle1.lifetime=300;
  obstacle1.velocityX=-(6 + 2*distance/150);
  obstacle1.setCollider("circle",0,0,650)
  //obstacle1.debug=true
  CG1.add(obstacle1);

}
function obstacle2I(){
  var obstacle2=createSprite(1100,Math.round(random(0,300)),10,10)
  obstacle2.scale=0.07
  obstacle2.addImage(obstacle2Image);
  obstacle2.lifetime=300;
  obstacle2.velocityX=-(6 + 2*distance/150);
  obstacle2.setCollider("circle",0,0,650)
  //obstacle2.debug=true
  CG2.add(obstacle2);

}
function obstacle3I(){
  var obstacle3=createSprite(1100,Math.round(random(0,300)),10,10)
  obstacle3.scale=0.07
  obstacle3.addImage(obstacle1Image);
  obstacle3.lifetime=300;
  obstacle3.velocityX=-(6 + 2*distance/150);
  obstacle3.setCollider("circle",0,0,650)
  //obstacle3.debug=true
  CG3.add(obstacle3);

}

function reset(){
  
  gameState=PLAY
  gameOver.visible=false;
  mainCyclist.changeAnimation("racerRunning",mainRacerImg1); 
  distance = 0;
  path.velocityX=-5
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  CG1.destroyEach();
  CG2.destroyEach();
  CG3.destroyEach();
  
}