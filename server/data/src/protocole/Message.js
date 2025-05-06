class Message
{
	constructor({ event, object })
	{
		this.message = event;
		this.data = JSON.stringify(object);
	}
	static instance = new Message({event: '', object: {}});
}

export default Message;
