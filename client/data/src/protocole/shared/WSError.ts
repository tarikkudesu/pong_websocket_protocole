
class WSError
{
	public message: string;
	constructor(error: string)
	{
		this.message = error;
	}
	static instance = new WSError('');
}

