import Message from './Message.js';
import WSError from './WSError.js';

import Pooler from './req/Pooler.js';
import Frame from './req/Frame.js';
import Start from './req/Start.js';
import Score from './req/Score.js';
import Stop from './req/Stop.js';
import Lost from './req/Lost.js';
import Pool from './req/Pool.js';
import Won from './req/Won.js';

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
	
	// * connect, invite, play, hook

	// ? Protocole Classes
	Message = Message;
	WSError = WSError;

	Pooler = Pooler;
	Frame = Frame;
	Start = Start;
	Score = Score;
	Stop = Stop;
	Pool = Pool;
	Lost = Lost;
	Won = Won;

	Connect = Connect;
	Invite = Invite;
	Play = Play;
	Hook = Hook;
	
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

	// ? Protocole Message Builders
	ConnectMessage(username: string): string
	{
		return JSON.stringify(new Message({ event: 'connect', object: new Connect(username) }));
	}
	InviteMessage(from: string, to: string): string
	{
		return JSON.stringify(new Message({ event: 'invite', object: new Invite(from, to) }));
	}
	PlayMessage(username: string, opponent: string): string
	{
		return JSON.stringify(new Message({ event: 'play', object: new Play(username, opponent) }));
	}
	HookMessage(up: boolean, down: boolean): string
	{
		return JSON.stringify(new Message({ event: 'hook', object: new Hook(up, down) }));
	}
	ErrorMessage(error: string)
	{
		return JSON.stringify(new Message({ event: 'error', object: new WSError(error) }));
	}
}

export default new WS();
