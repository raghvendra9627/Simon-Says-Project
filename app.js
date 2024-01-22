let gameSeq = [];
let userSeq = [];
let level = 0;
let btns = ["yellow","blue","purple","green"];
let gameStarted = false;
highestScore = 0;
let h3 = document.querySelector("h3");
let startBtn = document.querySelector("#start");
let resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click",function() {
    if (highestScore < level){
        highestScore = level;
    }
    h3.innerHTML = `Press Start to start your Game`;
    reset();
})

startBtn.addEventListener("click", function() {
    if (gameStarted == false) {
        gameStarted = true;
        console.log("game started");
        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },500);
}

function levelUp() {
    userSeq = []
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randbtn);
}

function check(idx) {
    if (userSeq[idx] == gameSeq[idx]){
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        if (highestScore < level){
            highestScore = level;
        }
        h3.innerHTML = `Game Over! Your Score was <b>${level}</b> and Highest Score is ${highestScore} <br> Press start to restart`;
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    check(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    level = 0;
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
}