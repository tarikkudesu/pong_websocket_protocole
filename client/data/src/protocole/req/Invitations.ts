
class Invitations
{
	public invitations: User[];
	constructor(invitations: User[])
	{
		this.invitations = invitations;
	}
	static instance = new Invitations([]);
}

