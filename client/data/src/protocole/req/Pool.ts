import Pooler from './Pooler.js';

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
