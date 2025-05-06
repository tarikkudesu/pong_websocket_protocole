
interface MessageProps
{
	event: string;
	object: Object;
}

class Message
{
	public message: string;
	public data: string;
	constructor({ event, object }: MessageProps)
	{
		this.message = event;
		this.data = JSON.stringify(object);
	}
	public static instance = new Message({event: '', object: {}});
}

export default Message;
