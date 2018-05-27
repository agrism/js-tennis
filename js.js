var ballX = 100
var ballY = 100

var ballSpeedX = 10;
var ballSpeedY = 4;

var ballRadius = 5
var framePerSecond = 40

var paddle1Y = 250
var paddle2Y = 250

var player1Score = 0
var player2Score = 0

var isGameStopped = false

const WINNER_SCORE = 3

const PADDLE_HEIGHT = 100
const PADDLE_TIKNESS = 10

var gameLevel = 1


window.onload = function () {
	canvas = document.getElementById('canva')
	canvasContext = canvas.getContext('2d')
	canvasContext.font = "20px Georgia";

	paddle2Y = paddle1Y = canvas.height / 2 - PADDLE_HEIGHT / 2

	setInterval(function () {


		if (player1Score >= WINNER_SCORE || player2Score >= WINNER_SCORE) {

			if (player1Score > player2Score) {

				drawCenteredText('Congrats', 300, 'Green');
				drawCenteredText('Click to continue on Level: '+(gameLevel), 350, 'grey');

				winner = 'Left'

				if (!isGameStopped) {
					gameLevel++
				}
			} else {
				winner = 'Right'
				drawCenteredText('GAME OVER', 300, 'red');
				gameLevel = 1

				drawCenteredText('Click to start game again on Level: '+(gameLevel), 350, 'grey');

			}

			drawCenteredText(winner + ' Player won', 100, 'Green');

			isGameStopped = true
		}
		else {
			moveEverything()
			drawEverything()
		}


	}, 1000 / framePerSecond);

	canvas.addEventListener('mousemove', function (evt) {
		var mousePos = calculateMousePos(evt)
		paddle1Y = mousePos.y - PADDLE_HEIGHT / 2
	})

	canvas.addEventListener('click', function (evt) {
		player1Score = 0;
		player2Score = 0;
		isGameStopped = false
	})
}

function drawEverything() {

	drawRectangle(0, 0, canvas.width, canvas.height, 'white');

	drawRectangle(0, paddle1Y, PADDLE_TIKNESS, PADDLE_HEIGHT, 'black');
	drawRectangle(canvas.width - PADDLE_TIKNESS, paddle2Y, PADDLE_TIKNESS, PADDLE_HEIGHT, 'black');

	drawBall(ballX, ballY, ballRadius, 'black');
	computerMovements()

	canvasContext.fillText(player1Score, 100, 100)
	canvasContext.fillText(player2Score, canvas.width - 100, 100)
	drawCenteredText('Game Level: ' + gameLevel, 50, 'grey');
}

function moveEverything() {

	ballX += ballSpeedX
	ballY += ballSpeedY

	if (ballX >= canvas.width) {
		ballSpeedX = -ballSpeedX

		if (ballY < paddle2Y || ballY > (paddle2Y + PADDLE_HEIGHT)) {
			player1Score++
			ballReset()
		} else {
			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2)
			ballSpeedY = deltaY * .35
		}

	} else if (ballX <= 0) {
		ballSpeedX = -ballSpeedX

		if (ballY < paddle1Y || ballY > (paddle1Y + PADDLE_HEIGHT)) {
			player2Score++
			ballReset()
		} else {
			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2)
			ballSpeedY = deltaY * .35
		}
	}

	if (ballY >= canvas.height) {
		ballSpeedY = -ballSpeedY
	} else if (ballY <= 0) {
		ballSpeedY = -ballSpeedY
	}

}

function drawBall(centerX, centerY, radius, color) {
	canvasContext.fillStyle = color
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	canvasContext.fill()
}

function drawRectangle(leftX, leftY, width, height, color) {
	canvasContext.fillStyle = color
	canvasContext.fillRect(leftX, leftY, width, height)

}

function drawCenteredText(text, heightFromTop, color = false) {
	if(color){
		canvasContext.fillStyle = color
	}
	width = canvasContext.measureText(text).width
	canvasContext.fillText(text, (canvas.width - width) / 2, heightFromTop)
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect()
	var root = document.documentElement;

	return {
		x: evt.clientX - rect.left - root.scrollLeft,
		y: evt.clientY - rect.top - root.scrollTop
	}
}

function ballReset() {
	ballX = canvas.width / 2
	ballY = canvas.height / 2
	ballSpeedY = 0
	ballSpeedX = -ballSpeedX
}

function computerMovements() {

	paddle2Center = paddle2Y + PADDLE_HEIGHT / 2

	if (ballY < (paddle2Center - 35)) {
		if (paddle2Y > 0) {
			paddle2Y -= getComputerMovingPixels()
		}
	} else if (ballY > (paddle2Center + 35)) {
		if (paddle2Y < (canvas.height - PADDLE_HEIGHT)) {
			paddle2Y += getComputerMovingPixels()
		}
	}
}

function getComputerMovingPixels() {
	return gameLevel + 6;
}