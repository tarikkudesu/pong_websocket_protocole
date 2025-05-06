import Message from './Message.js';
import WSError from './WSError.js';

import Pooler from './res/Pooler.js';
import Frame from './res/Frame.js';
import Start from './res/Start.js';
import Score from './res/Score.js';
import Stop from './res/Stop.js';
import Lost from './res/Lost.js';
import Pool from './res/Pool.js';
import Won from './res/Won.js';

import Connect from './req/Connect.js';
import Invite from './req/Invite.js';
import Hook from './req/Hook.js';
import Play from './req/Play.js';

import _ from 'lodash';

class WS {
	static #insance;

	constructor()
	{
		if (WS.#insance) return WS.#insance;
		WS.#insance = this;
	}

	// * frame, start, stop, pool, score, won, lost

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
	Hook = Hook;
	Play = Play;


	// ? Comminication Helpers
	Json({ message, target })
	{
		const json = JSON.parse(message);
		const properties = Object.getOwnPropertyNames(json);
		const targetProperties = Object.getOwnPropertyNames(target);
		targetProperties.forEach((property) => {
			if (_.includes(properties, property) === false)
				throw new Error('Invalid JSON');
		});
		return json;
	}

	// ? Protocole Message Builders
	FrameMessage(ball, rightPaddle, leftPaddle)
	{
		return JSON.stringify(new Message({ event: 'frame', object: new Frame(ball, rightPaddle, leftPaddle) }));
	}
	StartMessage()
	{
		return JSON.stringify(new Message({ event: 'start', object: new Start() }));
	}
	StopMessage()
	{
		return JSON.stringify(new Message({ event: 'stop', object: new Stop() }));
	}
	PoolMessage(getPoolers)
	{
		return JSON.stringify(new Message({ event: 'pool', object: getPoolers() }));
	}
	WonMessage()
	{
		return JSON.stringify(new Message({ event: 'won', object: new Won() }));
	}
	LostMessage()
	{
		return JSON.stringify(new Message({ event: 'lost', object: new Lost() }));
	}
	ScoreMessage(player, opponent)
	{
		return JSON.stringify(new Message({ event: 'score', object: new Score(player, opponent) }));
	}
	ErrorMessage(error)
	{
		return JSON.stringify(new Message({ event: 'error', object: new WSError(error) }));
	}
}

export default new WS();
