import Paddle from './Paddle.js';
import Ball from './Ball.js';
import Vector from './Vector.js';
import Wall from './Wall.js';

export function randInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Keys
{
	UP_R = false;
	DOWN_R = false;
	UP_L = false;
	DOWN_L = false;
}

class Pong
{
	gaming = true;
	keys = new Keys();
	ballRadius = 10; // * Customizable
	paddleHeight = 60; // * Customizable
	paddleRadius = 10; // * Customizable
	paddleDistance = 15; // * Customizable
	TopWall = new Wall({ start: new Vector(0, 0), end: new Vector(0, 0) });
	RightWall = new Wall({ start: new Vector(0, 0), end: new Vector(0, 0) });
	BottomWall = new Wall({ start: new Vector(0, 0), end: new Vector(0, 0) });
	LeftWall = new Wall({ start: new Vector(0, 0), end: new Vector(0, 0) });
	ball = new Ball({ pos: new Vector(0, 0), radius: 0, velocity: new Vector(0, 0) });
	rightPaddle = new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) });
	leftpaddle = new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) });

	constructor()
	{}

	setup(width, height)
	{
		// * Create Walls
		this.TopWall = new Wall({ start: new Vector(5, 0), end: new Vector(width - 5, 0) });
		this.RightWall = new Wall({ start: new Vector(width - 5, 0), end: new Vector(width - 5, height) });
		this.BottomWall = new Wall({ start: new Vector(width - 5, height), end: new Vector(0, height) });
		this.LeftWall = new Wall({ start: new Vector(5, height), end: new Vector(5, 0) });

		// * Create Paddles
		this.rightPaddle = new Paddle({
			start: new Vector(width - this.paddleDistance, height / 2 - this.paddleHeight),
			end: new Vector(width - this.paddleDistance, height / 2 + this.paddleHeight),
			radius: this.paddleRadius,
			constrains: new Vector(
				this.paddleHeight + this.paddleRadius + this.ballRadius * 2,
				height - this.paddleHeight - this.paddleRadius - this.ballRadius
			),
		});
		this.leftpaddle = new Paddle({
			start: new Vector(this.paddleDistance, height / 2 - this.paddleHeight),
			end: new Vector(this.paddleDistance, height / 2 + this.paddleHeight),
			radius: this.paddleRadius,
			constrains: new Vector(
				this.paddleHeight + this.paddleRadius + this.ballRadius * 2,
				height - this.paddleHeight - this.paddleRadius - this.ballRadius
			),
		});

		const angle = randInt((-Math.PI / 6) * 100, (Math.PI / 6) * 100);

		// * Create ball
		this.ball = new Ball({
			pos: new Vector(width / 2, height / 2),
			radius: this.ballRadius,
			velocity: new Vector(1 * Math.cos(angle / 100), 1 * Math.sin(angle / 100)).unit(),
		});
	}
	keyPressRight(up, down)
	{
		if (up) this.keys.UP_R = true;
		else this.keys.UP_R = false;
		if (down) this.keys.DOWN_R = true;
		else this.keys.DOWN_R = false;


		this.rightPaddle.move(up, down);
	}
	keyPressLeft(up, down)
	{
		if (up) this.keys.UP_R = true;
		else this.keys.UP_R = false;
		if (down) this.keys.DOWN_R = true;
		else this.keys.DOWN_R = false;


		this.leftpaddle.move(up, down);
	}

	upddateBall()
	{
		if (this.collision_ball_paddle(this.ball, this.rightPaddle))
			{
			this.penetration_resolution_ball_paddle(this.ball, this.rightPaddle);
			this.collision_response_ball_paddle(this.ball, this.rightPaddle);
		}
		if (this.collision_ball_paddle(this.ball, this.leftpaddle))
			{
			this.penetration_resolution_ball_paddle(this.ball, this.leftpaddle);
			this.collision_response_ball_paddle(this.ball, this.leftpaddle);
		}
		if (this.collision_detection_ball_wall(this.ball, this.TopWall))
			{
			this.penetration_resolution_ball_wall(this.ball, this.TopWall);
			this.collision_response_ball_wall(this.ball, this.TopWall);
		}
		if (this.collision_detection_ball_wall(this.ball, this.BottomWall))
			{
			this.penetration_resolution_ball_wall(this.ball, this.BottomWall);
			this.collision_response_ball_wall(this.ball, this.BottomWall);
		}
		if (this.collision_detection_ball_wall(this.ball, this.RightWall))
			{
			this.gaming = false;
			// this.penetration_resolution_ball_wall(this.ball, this.RightWall);
			// this.collision_response_ball_wall(this.ball, this.RightWall);
		}
		if (this.collision_detection_ball_wall(this.ball, this.LeftWall))
			{
			this.gaming = false;
			// this.penetration_resolution_ball_wall(this.ball, this.LeftWall);
			// this.collision_response_ball_wall(this.ball, this.LeftWall);
		}
		this.ball.reposition();
	}
	updatePaddles()
	{
		// TODO: needs morework
			// TODO: collision detection
			// TODO: penetration resolution
			// TODO: collision response
		this.rightPaddle.reposition();
		this.leftpaddle.reposition();
	}

	// * Collisions
	closestPointOnLineSigment(point, wall)
	{
		// * check if the ball is before the line segment
		const ballToWallStart = wall.start.subtr(point);
		if (Vector.dot(wall.dir, ballToWallStart) > 0) return wall.start;
		// * check if the ball is after the line segment
		const wallEndToBall = point.subtr(wall.end);
		if (Vector.dot(wall.dir, wallEndToBall) > 0) return wall.end;
		// * check if the ball is inside the line segment
		const closestDist = Vector.dot(wall.dir, ballToWallStart);
		const closestVect = wall.dir.mult(closestDist);
		return wall.start.subtr(closestVect);
	}

	// * Collision Ball Wall
	collision_detection_ball_wall(ball, wall)
	{
		const ballToClosest = this.closestPointOnLineSigment(ball.pos, wall).subtr(ball.pos);
		const penVect = ball.pos.subtr(this.closestPointOnLineSigment(ball.pos, wall));
		if (Vector.dot(penVect, wall.dir.normal()) < 0) return true;
		if (ballToClosest.mag() <= ball.radius) return true;
		return false;
	}
	penetration_resolution_ball_wall(ball, wall)
	{
		let penVect = ball.pos.subtr(this.closestPointOnLineSigment(ball.pos, wall));
		if (Vector.dot(penVect, wall.dir.normal()) < 0) penVect = penVect.normal().normal();
		ball.pos = ball.pos.add(penVect.unit().mult(ball.radius - penVect.mag()));
	}
	collision_response_ball_wall(ball, wall)
	{
		const normal = ball.pos.subtr(this.closestPointOnLineSigment(ball.pos, wall)).unit();
		ball.velocity = ball.velocity.subtr(normal.mult(2 * Vector.dot(ball.velocity, normal)));
	}

	// * Collision Ball Paddle
	collision_ball_paddle(ball, paddle)
	{
		const wall = new Wall({ start: paddle.start, end: paddle.end });
		const ballToClosest = this.closestPointOnLineSigment(ball.pos, wall);
		const distance = ballToClosest.subtr(ball.pos).mag();
		if (distance < paddle.radius + ball.radius) return true;
		return false;
	}
	penetration_resolution_ball_paddle(ball, paddle)
	{
		const wall = new Wall({ start: paddle.start, end: paddle.end });
		const penVect = ball.pos.subtr(this.closestPointOnLineSigment(ball.pos, wall));
		ball.pos = ball.pos.add(penVect.unit().mult(ball.radius + paddle.radius - penVect.mag()));
	}
	collision_response_ball_paddle(ball, paddle)
	{
		const wall = new Wall({ start: paddle.start, end: paddle.end });
		const normal = ball.pos.subtr(this.closestPointOnLineSigment(ball.pos, wall)).unit();
		ball.velocity = ball.velocity.subtr(normal.mult(Vector.dot(ball.velocity, normal)).mult(2)).mult(1 + paddle.acc.unit().mag() * 0.2);
		if (ball.velocity.mag() > 2) ball.velocity = ball.velocity.unit().mult(2);
		if (Math.abs(ball.velocity.y) > Math.abs(ball.velocity.x))
			{
			const x = ball.velocity.x;
			ball.velocity.x = ball.velocity.y;
			ball.velocity.y = x;
		}
	}

	// * Main Frame
	updateFrame(frames)
	{
		this.upddateBall();
		this.updatePaddles();
	}
}

export default Pong;
