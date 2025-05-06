import User from "../shared/User";

class Invitations
{
	public invitations: User[];
	constructor(invitations: User[])
	{
		this.invitations = invitations;
	}
	static instance = new Invitations([]);
}

export default Invitations;
