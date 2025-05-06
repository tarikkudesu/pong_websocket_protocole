class Message
{
	constructor({ event, object })
	{
		this.message = event;
		this.data = JSON.stringify(object);
	}
}

export default Message;
