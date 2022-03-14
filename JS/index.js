// Game constand and Variables.
let direction={x:0, y:0};
const foodSound= new Audio('../music/food.mp3');
const gameOverSound= new Audio ('../music/gameOver.mp3'); 
const moveSound= new Audio('../music/move.mp3');
const musicSound = new  Audio ('../music/music.mp3');
let speed= 10;
let lastPaintTime= 0;
let snakeArr=[
    {x: 10, y: 10}
]
let score=0;
let food= {x: 5, y: 7};
let inputDir=  {x: 0, y: 0};
// the most import paramenter of the game while making the game in which you have to repeat a certain code and print on the screen again and again.


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);  
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime= ctime;
    gameEngine();
}

function isCollid(snake){
    // If you bump into Yourself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //If you bump into the Wall
    if(snake[0].x >=18 || snake[0].x <=0 ||  snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    // Part 1: Updating the snake array and Food
    if(isCollid(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        alert("Game Over . Press Any key to play again!");
        snakeArr =[ 
            {x: 12, y: 15}
        ]
        musicSound.play();
        scroll=0;

    }

    //IF you have Eaten the food , increment the score nad regenrate the food 
    if(snakeArr[0].y=== food.y &&  snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:  snakeArr[0].y + inputDir.y})
        score +=1;
        if(score> highscoreval){
            highscoreval=score;
            localStorage.setItem('highscore', JSON.stringify(highscoreval));
            HighscoreBox.innerHTML= "score: "+highscoreval;
        }
        scoreBox.innerHTML =" Score : " + score;
        foodSound.play();
        let a=2;
        let b=16;
        food= {x: Math.round(a+(b-1)*Math.random()), y: Math.round(a+(b-1)*Math.random()) }
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1]= {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        // snakeElement= document.createElement('div');
        snakeElement= document.createElement('div');
        snakeElement.style.gridColumnStart = e.x; 
        snakeElement.style.gridRowStart = e.y;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Part 2: Display the food
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x; 
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


// Main logic Starts here
let highscore= localStorage.getItem('highscore');
if(highscore=== null){
    highscoreval= 0;
    localStorage.setItem('highscore', JSON.stringify(highscore) );
}
else{
    highscoreval= JSON.parse(highscore);  
    HighscoreBox.innerHTML= "HighScore: "+ highscore  ;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir= {x:0, y: 1} // start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default:
            break;
    }
});