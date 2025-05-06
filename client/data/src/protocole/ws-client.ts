import Message from './Message.js';
import Connect from './res/Connect.js';
import Invite from './res/Invite.js';
import Hook from './res/Hook.js';
import Play from './res/Play.js';
import _ from 'lodash';

interface JsonProps
{
	message: string;
	target: Object;
}

class WS
{
	private static instance: WS | null;
	constructor()
	{
		if (WS.instance) return WS.instance;
		WS.instance = this;
	}

	// ? Comminication Helpers
	Json({ message, target }: JsonProps)
	{
		const json = JSON.parse(message);
		const properties = Object.getOwnPropertyNames(json);
		Object.getOwnPropertyNames(target).forEach((property) => {
			if (_.includes(properties, property) === false)
				throw new Error('Invalid JSON');
		});
		return json;
	}
	

	// * connect, invite, play, hook

	// ? Protocole Message Builders
	ConnectMessage(connect: Connect): string
	{
		return JSON.stringify(new Message({ event: 'connect', object: connect }));
	}
	InviteMessage(invite: Invite): string
	{
		return JSON.stringify(new Message({ event: 'invite', object: invite }));
	}
	PlayMessage(play: Play): string
	{
		return JSON.stringify(new Message({ event: 'play', object: play }));
	}
	HookMessage(hook: Hook): string
	{
		return JSON.stringify(new Message({ event: 'hook', object: hook }));
	}

	// ? Protocole Classes
	public Message = Message;
	public Connect = Connect;
	public Invite = Invite;
	public Play = Play;
	public Hook = Hook;
}

export default new WS();
