var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        initApp();
    }
};

app.initialize();




function initApp() {

    // variables
    var acelerometro;
    var canvas = document.getElementById("myCanvas");
    canvas.width = window.screen.width - 10;
    canvas.height = window.screen.height - 60;
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

    acelerometro = navigator.accelerometer.watchAcceleration(onAcelerometroCall, failure, {
        frequency: 10
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

function onAcelerometroCall(acelerometroValue) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if ((y + dy) < ballRadius) {
        dy = -dy;
    } else if ((y + dy) > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if (((x + dx) > canvas.width - ballRadius) || ((x + dx) < ballRadius)) {
        dx = -dx;
    }
    if (acelerometroValue.x > 0 && paddleX > 0) {
        paddleX += -1 * (acelerometroValue.x * 1.8);
    } else if (acelerometroValue.x < 0 && paddleX < canvas.width - paddleWidth) {
        paddleX -= (acelerometroValue.x * 1.8);
    }
    x += dx;
    y += dy;
}

function failure() {
    alert("fail");
}
