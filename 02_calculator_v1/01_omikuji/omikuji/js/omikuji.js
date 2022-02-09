"use strict";
window.addEventListener("DOMContentLoaded",
    function() {
        $("header").textillate({
            loop: false,
            minDisplayTime: 2000,
            initialDelay: 2000,
            autoStart: true,
            in: {
                effect: "fadeIntellectBig",
                delayScale: 1.5,
                delay: 50,
                sync: false,
                shuffle: true
            }

        });
        $(function() {
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });
        setTimeout(
            function() {
                let popMessage = "いらっしゃい！おみくじ引いてって！";
                window.alert(popMessage);
            },
            "3000"
        );
    }, false
);

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
btn1.addEventListener("click",
    function() {

        let resultText1 = ["大吉!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "末吉！", "凶。。。"];
        let resultColor = ["#ff0000", "#ff0000", "#c71585", "#ff1493", "#ff69b4", "#1e90ff"];
        let resultFontSize = ["90px", "80px", "70px", "60px", "50px", "40px"];
        let n = Math.floor(Math.random() * resultText1.length);
        let resultMaxSpeed = [10, 10, 8, 5, 5, 5];
        let resultMaxSize = [30, 30, 20, 15, 20, 20];
        let resultImage = ["image/star.png", "image/sakura_hanabira.png", "image/sakura_hanabira.png", "image/sakura_hanabira.png", "image/leaf.png", "image/snowflakes.png"];
        let resultSound = ["sound/omikuji_sound1.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound3.mp3", "sound/omikuji_sound3.mp3"]
        omikujiText.textContent = resultText1[n];
        omikujiText.style.color = resultColor[n];
        omikujiText.style.fontSize = resultFontSize[n];

        $(document).snowfall("clear");

        $(document).ready(function() {
            $(document).snowfall({
                maxSpeed: resultMaxSpeed[n],
                minSpeed: 1,
                maxSize: resultMaxSize[n],
                minSize: 1,
                image: resultImage[n],
            })
        })
        let music= new Audio(resultSound[n]);
        music.currentTime=0;
        music.play();
    }, false
);