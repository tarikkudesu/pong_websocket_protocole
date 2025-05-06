
class Score
{
	public player: number;
	public opponent: number;
	constructor(player: number, opponent: number)
	{
		this.player = player;
		this.opponent = opponent;
	}
	static instance = new Score(0, 0);
}

export default Score;
