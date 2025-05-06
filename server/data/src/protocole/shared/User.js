class User
{
	constructor(username, email)
	{
		this.username = username;
		this.email = email;
	}
	static instance = new User('', '');
}

export default User;
