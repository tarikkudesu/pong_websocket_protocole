
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

class Pool
{
	public pool: Pooler[];
	constructor(pool: Pooler[])
	{
		this.pool = pool;
	}
	static instance = new Pool([]);
}

export default Pool;
