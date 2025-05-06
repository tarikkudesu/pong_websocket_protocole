import Ball from '../game/Ball.js';
import Paddle from '../game/Paddle.js';
import Vector from '../game/Vector.js';

class Frame
{
	ballX;
	ballY;
	ballRadius;
	paddleRadius;
	leftPaddleTopX;
	leftPaddleTopY;
	rightPaddleTopX;
	rightPaddleTopY;
	leftPaddleBottomX;
	leftPaddleBottomY;
	rightPaddleBottomX;
	rightPaddleBottomY;
	constructor(ball, rightPaddle, leftPaddle)
	{
		this.ballRadius = Math.ceil(ball.radius);
		this.paddleRadius = Math.ceil(rightPaddle.radius);
		this.ballX = Math.ceil(ball.pos.x);
		this.ballY = Math.ceil(ball.pos.y);
		this.rightPaddleTopX = Math.ceil(rightPaddle.start.x);
		this.rightPaddleTopY = Math.ceil(rightPaddle.start.y);
		this.rightPaddleBottomX = Math.ceil(rightPaddle.end.x);
		this.rightPaddleBottomY = Math.ceil(rightPaddle.end.y);
		this.leftPaddleTopX = Math.ceil(leftPaddle.start.x);
		this.leftPaddleTopY = Math.ceil(leftPaddle.start.y);
		this.leftPaddleBottomX = Math.ceil(leftPaddle.end.x);
		this.leftPaddleBottomY = Math.ceil(leftPaddle.end.y);
	}
	static instance = new Frame(
		new Ball({ pos: new Vector(0, 0), radius: 0, velocity: new Vector(0, 0) }),
		new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) }),
		new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) })
	);
}

export default Frame;
