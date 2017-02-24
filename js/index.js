var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        initApp();
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        screen.lockOrientation('portrait');
    }
};

app.initialize();



var acelerometro;
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-60;
var ctx = canvas.getContext("2d");

//cordenadas de la bola
var x = canvas.width / 2;
var y = 20;

//direccion de la bola
var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth) / 2;
//var lifes = window.localStorage.getItem("lifes")!=null?window.localStorage.getItem("lifes"):3;
var lifes = 3;

var isGameOver = false;
var esperar=0;

function initApp() {
    acelerometro = navigator.accelerometer.watchAcceleration(onAcelerometroCall, failure, {
        frequency: 1
    });
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fc4400";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawLifes() {
    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline="midle"
    ctx.fillText(lifes, canvas.width / 2, canvas.height / 2);
}



function gameOver() {
    isGameOver=true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline="midle"
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

}
function onAcelerometroCall(acelerometroValue) {
    if (isGameOver){
      esperar++;
      if (esperar==50) {
        isGameOver=false;
      }
    }
     else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLifes();
        drawBall();
        drawPaddle();

        if ((y + dy) < ballRadius) {
            dy = -dy;
        } else if ((y + dy) > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lifes -= 1;
            //    window.localStorage.setItem("lifes",lifes);
                x = 1 + ballRadius;
                y = 1 + ballRadius;
                if (lifes == 0) {
                    lifes = 3;
                    esperar=0;
                    gameOver();
                }
            }
        }
        if (((x + dx) > canvas.width - ballRadius) || ((x + dx) < ballRadius)) {
            dx = -dx;
        }
        if (acelerometroValue.x > 0 && paddleX > 0) {
            paddleX += -1 * (acelerometroValue.x * 1.2);
        } else if (acelerometroValue.x < 0 && paddleX < canvas.width - paddleWidth) {
            paddleX -= (acelerometroValue.x * 1.2);
        }
        x += dx;
        y += dy;
    }
}

function failure() {
    alert("fail");
}
