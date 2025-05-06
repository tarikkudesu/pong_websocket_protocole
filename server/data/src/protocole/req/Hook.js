
class Hook
{
	constructor(up, down)
	{
		this.up = up;
		this.down = down;
	}
	static instance = new Hook(false, false);
}

export default Hook;
