
class WSError
{
	constructor(error)
	{
		this.message = error;
	}
	static instance = new WSError('');
}

export default WSError;
