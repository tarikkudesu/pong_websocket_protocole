import Message from './Message.js';
import Frame from './res/Frame.js';
import Start from './res/Start.js';
import Stop from './res/Stop.js';

class WS {
	static #insance;

	constructor()
	{
		if (WS.#insance) return WS.#insance;
		WS.#insance = this;
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

	// ? Protocole Classes
	Message = Message;
	Frame = Frame;
	Start = Start;
	Stop = Stop;
}

export default new WS();
