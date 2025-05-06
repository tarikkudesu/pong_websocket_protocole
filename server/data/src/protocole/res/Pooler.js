
class Pooler
{
	constructor(username, profile)
	{
		this.username = username;
		this.profile = profile;
	}
	static instance = new Pooler('', '');
}

export default Pooler;
