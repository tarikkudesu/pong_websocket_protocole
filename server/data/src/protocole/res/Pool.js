export class Pooler
{
	constructor(username, profile)
	{
		this.username = username;
		this.profile = profile;
	}
	static instance = new Pooler('', '');
}

class Pool
{
	constructor(pool)
	{
		this.pool = pool;
	}
	static instance = new Pool([]);
}

export default Pool;
