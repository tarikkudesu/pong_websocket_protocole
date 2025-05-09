
class Hook
{
	up: boolean;
	down: boolean;
	constructor(up: boolean, down: boolean)
	{
		this.up = up;
		this.down = down;
	}
	public static instance = new Hook(false, false);
}

