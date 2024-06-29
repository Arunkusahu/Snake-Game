//game constants adn variables

let inputDir = {x:0, y:0};
let foodsound = new Audio('food.mp3');
let gameoversound = new Audio('gameover.mp3');
let movesound = new Audio('move.mp3');
let musicsound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastpainttime = 0;
let snakearr = [
    {x : 13 , y : 15}
]

food = {x:6 , y:7};

//game funcitons

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameengine();

}

function iscollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <=0 && snake[0].y >= 18 || snake[0].y <=0) {
        return true;
    }
}

function gameengine(){
    //part 1 : updating the snake array
    if(iscollide(snakearr)){
        gameoversound.play();
        //musicsound.pause();
        inputDir = {x: 0, y: 0};
        alert("game over. press any key to play again!");
        snakearr =[{x : 13 , y : 15}];
        //musicsound.play();
        score = 0;
    }

    //if you have eaten the food, icrement the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score +=1;
        // if (score > hiscoreval) {
        //     hiscoreval = score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscore));
        //     hiscorebox.innerHTML = "Hi score: " + hiscoreval;
        // }
        scorebox.innerHTML = "score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
    }
    
    //moving the snake
    for(let i = snakearr.length - 2; i >= 0; i--){
        
        snakearr[i+1] = {...snakearr[i]};

    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    //part 2 : display the snake and food
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}



//main logic starts here 

// let hiscore = localStorage.getItem("hiscore");
// if (hiscore === null) {
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiscorebox.innerHTML = "Hi score: " + hiscoreval;
// }

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}  //start the game
    movesound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});

