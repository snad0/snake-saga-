//constants & variables
let inputDir={x: 0, y: 0};
let foodsound= new Audio("music/food.mp3");
let gameOverSound= new Audio("music/gameover.mp3");
let moveSound= new Audio("music/move.mp3");
let musicSound= new Audio("music/music.mp3");
let speed=8;
let score=0;
let lastPaintTime=0;
let snakeArr= [{x:13,y:15}]
let food ={x:5, y:8}
// let point ={x:10, y:12}

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
   
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if snake's head{snake[0]} collide snake body part {snake[i]}....
  for (let i = 1; i < snakeArr.length; i++) {
     if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
         return true;
        }
    }
    // collision with wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0 ) {
        return true;
    }
    return false;
}

function gameEngine(){
    // part1: updating the snake aray & Food
  
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("GAME OVER!. Press enter to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    //  if snake eats food increment score and regenrate food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML= "score: "+ score;

         snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
         let a=2;
         let b=16;
         food = {x:Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
         
    }
    // if(snakeArr[0].y === point.y && snakeArr[0].x === point.x){
    //     foodsound.play();
    //     score += 5;
        
    //     scoreBox.innerHTML= "score: "+ score;
    //     snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
    //     clearTimeout(5000)
    //     let c=4;
    //     let d=15;
    //     point = {x:Math.round(c+(d-c)*Math.random()), y: Math.round(c+(d-c)*Math.random())}
    // }
    
                                          




     //moving the snake
     for (let i =snakeArr.length-2; i >=0; i--){
        //  const element = snakeArr[i];
         snakeArr[i+1]={...snakeArr[i]}        
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y



    // part 2: Display the snake and food
    //Display snake
    board.innerHTML ="";
    snakeArr.forEach((e, index)=>{ //sare objects jo hamare array k andar hai unke lie ab kya krna hai wo dekhte hai filhal array empty hai 
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x ;
        if(index==0){
            
            snakeElement.classList.add('head') 
        }
        else{
            snakeElement.classList.add('snake') 
            //script me class add krdi jisko phle grid de chuke hai to ye grid ka size le lega

        }
        board.appendChild(snakeElement);
    });
    //Display food & pointer
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x ;
    foodElement.classList.add('food') 
    board.appendChild(foodElement);

    pointElement= document.createElement('div');
    pointElement.style.gridRowStart = point.y;
    pointElement.style.gridColumnStart = point.x ;
    pointElement.classList.add('point') 
    board.appendChild(pointElement);




}





//Main l0gic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    inputDir={x:0, y:1} //this will start game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            
            break;
    
        default:
            break;
    }
})