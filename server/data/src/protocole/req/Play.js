class Play
{
	constructor(username, opponent)
	{
		this.username = username;
		this.opponent = opponent;
	}
	static instance = new Play('', '');
}

export default Play;
