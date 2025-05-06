class Connect
{
	// TODO: initial game data can be added here
	username: string;
	constructor(username: string)
	{
		this.username = username;
	}
	public static instance = new Connect('');
}

export default Connect;