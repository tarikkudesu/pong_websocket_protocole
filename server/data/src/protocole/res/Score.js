
class Score
{
	constructor(player, opponent)
	{
		this.player = player;
		this.opponent = opponent;
	}
	static instance = new Score(0, 0);
}

export default Score;
