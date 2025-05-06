
class Pooler
{
	public username: string;
	public profile: string;
	constructor(username: string, profile: string)
	{
		this.username = username;
		this.profile = profile;
	}
	static instance = new Pooler('', '');
}

export default Pooler;
