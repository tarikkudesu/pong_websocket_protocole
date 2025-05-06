
class Pool
{
	constructor(pool)
	{
		this.pool = pool;
	}
	static instance = new Pool([]);
}

export default Pool;
