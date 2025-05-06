
class Stop
{
	public stop: string;
	constructor()
	{
		this.stop = 'stop';
	}
	public static instance = new Stop();
}

export default Stop;
