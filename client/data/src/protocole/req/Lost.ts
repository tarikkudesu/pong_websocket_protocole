
class Lost
{
	public lost: string;
	constructor()
	{
		this.lost = 'lost';
	}
	static instance = new Lost();
}

export default Lost;
