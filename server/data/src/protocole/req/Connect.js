class Connect
{
	// TODO: initial game data can be added here
	constructor(username)
	{
		this.username = username;
	}
	static instance = new Connect('');
}

export default Connect;