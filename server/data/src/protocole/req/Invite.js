
class Invite
{
	constructor(from, to)
	{
		this.from = from;
		this.to = to;
	}
	static instance = new Invite('', '');
}

export default Invite;
