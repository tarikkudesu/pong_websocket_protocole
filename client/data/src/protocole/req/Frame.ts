
class Frame
{
	ballX: number = 0;
	ballY: number = 0;
	ballRadius: number = 0;
	paddleRadius: number = 0;
	leftPaddleTopX: number = 0;
	leftPaddleTopY: number = 0;
	rightPaddleTopX: number = 0;
	rightPaddleTopY: number = 0;
	leftPaddleBottomX: number = 0;
	leftPaddleBottomY: number = 0;
	rightPaddleBottomX: number = 0;
	rightPaddleBottomY: number = 0;
	constructor() {}
	public static instance = new Frame();
}

export default Frame;
