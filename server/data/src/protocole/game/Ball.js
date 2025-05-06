import Vector from './Vector.js';

class Ball
{
	pos;
	radius;
	velocity = new Vector(0, 0);
	constructor({ pos, radius, velocity })
	{
		this.pos = pos;
		this.radius = radius;
		this.velocity = velocity;
	}
	reposition()
	{
		this.pos = this.pos.add(this.velocity.mult(10));
	}
}

export default Ball;
