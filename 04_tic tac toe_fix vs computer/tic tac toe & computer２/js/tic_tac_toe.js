"use strict";
// flagがtrueのときペンギンのターン、falseの時熊のターン
let flag = true;
let counter = 9;
//class="square" を取得
const squares = document.getElementsByClassName("square");
//array 変換
const squaresArray = Array.from(squares);
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2"); //要素を取得しセット
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

//win or lose Judgment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

const msgtxt1 = '<p class="image"><img src = "img/penguins.jpg" width="61px" height="61px"></p><p class="text">Penguins Attack! (your turn)</p>';
const msgtxt2 = '<p class="image"><img src = "img/whitebear.jpg" width="61px" height="61px"></p><p class="text">WhiteBear Attack! (computer turn)</p>';
const msgtxt3 = '<p class="image"><img src = "img/penguins.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src = "img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInLeft">whiteBear Win!!</p>';
const mgstxt5 = '<p class="image"><img src = "img/penguins.jpg" width="61px" height="61px"><img src = "img/whitebear.jpg" width="61px" height="61px"></p><p class = "text animate__bounceIn">Draw!!</p>';

let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded",
    function() {
        setMessage("pen-turn");
        squaresArray.forEach(function(square) {
            square.classList.add("js-clickable");
        });
    }, false
);

function JudgLine(targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
// a_1.addEventListener("click",
//    function(){
//       isSelect(a_1);
//    },false
// );
// a_2.addEventListener("click",() => {
//     isSelect(a_2);
// });
// a_3.addEventListener("click",() => {
//     isSelect(a_3);
// });
// b_1.addEventListener("click",() => {
//     isSelect(b_1);
// });
// b_2.addEventListener("click",() => {   
//     isSelect(b_2);
// });
// b_3.addEventListener("click",() => {
//     isSelect(b_3);
// });
// c_1.addEventListener("click",() => {
//     isSelect(c_1);
// });
// c_2.addEventListener("click",() => {
//     isSelect(c_2);
// });
// c_3.addEventListener("click",() => {
//     isSelect(c_3);
// });
//上と同じやり方略
squaresArray.forEach(function(square) {
    square.addEventListener('click', () => {
        let gameOverFlg = isSelect(square);
        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function() {
                    bearTurn();
                },
                "2000"
            );
        }
    });
});

function isSelect(selectSquare) {
    let gameOverFlg = "0";
    if (flag === true) {
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        //peguins win
        if (isWinner("penguins") === true) {
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        };
        setMessage("bear-turn");
        flag = false;
    } else {
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable"); //square ga click kanouka handansuru class wo remove
        if (isWinner("bear") === true) {
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = true;
    }
    counter--;
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}

function isWinner(symbol) {
    const result = lineArray.some(function(line) {
        const subResult = line.every(function(square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) { winningLine = line }

        return subResult;
    });
    return result;
}

function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML = mgstxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}

function gameOver(status) {
    let w_sound
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;

        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
    //all square unclickable
    //squaresArray.forEach(function(square){
    //    square.classList.add("js-unclickable");
    //});
    squaresBox.classList.add("js-unclickable");
    //display new game button :display
    newgamebtn_display.classList.remove("js-hidden");


    //winEffect
    if (status === "penguins") {
        console.log(winningLine);
        if (winningLine) {
            winningLine.forEach(square => {
                square.classList.add("js-pen_highLight");
            })
        };
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });

    } else if (status === "bear") {
        //winner-line bear high-line
        if (winningLine) {
            winningLine.forEach(square => {
                square.classList.add("js-bear_highLight");
            })
        };
        $(document).snowfall({
            flakeColor: "rgb(175,238,238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

newgamebtn.addEventListener("click", () => {
        flag = true;
        counter = 9;
        winningLine = null;
        squaresArray.forEach(function(square) {
            square.classList.remove("js-pen-checked");
            square.classList.remove("js-bear-checked");
            square.classList.remove("js-unclickable");
            square.classList.remove("js-pen_highLight");
            square.classList.remove("js-bear_highLight");
            square.classList.add("js-clickable");
        });
        squaresBox.classList.remove("js-unclickable");
        setMessage("pen-turn");
        newgamebtn_display.classList.add("js-hidden");
        $(document).snowfall("clear");
    })
    //tao bien dung let squaresArray la 1 mang filter la ten ham 

function bearTurn() {
    let bearTurnEnd = "0";
    let gameOverFlg = "0";
    while (bearTurnEnd === "0") {
        bearTurnEnd = isReach("bear");
        if (bearTurnEnd === "1") {
            gameOverFlg = "1";
            break;
        }
        bearTurnEnd = isReach("penguins");
        if (bearTurnEnd === "1") {
            break;
        }

        const bearSquare = squaresArray.filter(function(square) {
            return square.classList.contains("js-clickable");
        });
        let n = Math.floor(Math.random() * bearSquare.length); //hensu teigi n = cai gi do
        gameOverFlg = isSelect(bearSquare[n]);
        break;
    }
    if (gameOverFlg === "0") {
        let squaresBox = document.querySelector("#squaresBox");
        squaresBox.classList.remove("js-unclickable")
    }
};

function isReach(status) {
    let bearTurnEnd = "0";
    lineArray.some(function(line) {
        let bearCheckCnt = 0;
        let penCheckCnt = 0;
        line.forEach(function(square) {
            if (square.classList.contains("js-bear-checked")) {
                bearCheckCnt++;
            }
            if (square.classList.contains("js-pen-checked")) {
                penCheckCnt++;
            }

        });
        if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
            bearTurnEnd = "1";
        }
        if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            bearTurnEnd = "1";
        }
        if (bearTurnEnd === "1") {
            line.some(function(square) {
                if (square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }
    });
    return bearTurnEnd;
}