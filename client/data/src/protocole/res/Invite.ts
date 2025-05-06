
class Invite
{
	from: string;
	to: string;
	constructor(from: string, to: string)
	{
		this.from = from;
		this.to = to;
	}
	public static instance = new Invite('', '');
}

export default Invite;
