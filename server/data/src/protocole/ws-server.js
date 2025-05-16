import { Ball, Vector, Paddle } from './game/index.js';

import _ from 'lodash';

// ! shared ------------------------------------------------------------------------------------------
export class Message {
	constructor({ event, object }) {
		this.message = event;
		this.data = JSON.stringify(object);
	}
	static instance = new Message({ event: '', object: {} });
}

export class WSError {
	constructor(error) {
		this.message = error;
	}
	static instance = new WSError('');
}

// ! res ------------------------------------------------------------------------------------------

// * Pool
export class Hash {
	constructor(username, img, hash) {
		this.username = username;
		this.hash = hash;
		this.img = img;
	}
	static instance = new Hash('', '', '');
}

export class Pooler {
	constructor(username, img) {
		this.username = username;
		this.img = img;
	}
	static instance = new Pooler('', '');
}

export class Pool {
	constructor(pool) {
		this.pool = pool;
	}
	static instance = new Pool([]);
}

export class Invitations {
	constructor(invitations) {
		this.invitations = invitations;
	}
	static instance = new Invitations([]);
}

// * Game
export class Start {
	constructor() {
		this.start = 'START';
	}
	static instance = new Start();
}

export class Stop {
	constructor() {
		this.stop = 'STOP';
	}
	static instance = new Stop();
}

export class Frame {
	ballX;
	ballY;
	ballRadius;
	paddleRadius;
	leftPaddleTopX;
	leftPaddleTopY;
	rightPaddleTopX;
	rightPaddleTopY;
	leftPaddleBottomX;
	leftPaddleBottomY;
	rightPaddleBottomX;
	rightPaddleBottomY;
	constructor(ball, rightPaddle, leftPaddle) {
		this.ballRadius = Math.ceil(ball.radius);
		this.paddleRadius = Math.ceil(rightPaddle.radius);
		this.ballX = Math.ceil(ball.pos.x);
		this.ballY = Math.ceil(ball.pos.y);
		this.rightPaddleTopX = Math.ceil(rightPaddle.start.x);
		this.rightPaddleTopY = Math.ceil(rightPaddle.start.y);
		this.rightPaddleBottomX = Math.ceil(rightPaddle.end.x);
		this.rightPaddleBottomY = Math.ceil(rightPaddle.end.y);
		this.leftPaddleTopX = Math.ceil(leftPaddle.start.x);
		this.leftPaddleTopY = Math.ceil(leftPaddle.start.y);
		this.leftPaddleBottomX = Math.ceil(leftPaddle.end.x);
		this.leftPaddleBottomY = Math.ceil(leftPaddle.end.y);
	}
	static instance = new Frame(
		new Ball({ pos: new Vector(0, 0), radius: 0, velocity: new Vector(0, 0) }),
		new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) }),
		new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) })
	);
}

export class Score {
	constructor(player, opponent) {
		this.player = player;
		this.opponent = opponent;
	}
	static instance = new Score(0, 0);
}

export class Lost {
	constructor() {
		this.lost = 'LOST';
	}
	static instance = new Lost();
}

export class Won {
	constructor() {
		this.won = 'WON';
	}
	static instance = new Won();
}

// ! req -------------------------------------------------------------------------

// * Pool
export class Connect {
	// TODO: initial game data can be added here
	constructor(username, img, page, query) {
		this.username = username;
		this.query = query;
		this.page = page;
		this.img = img;
	}
	static instance = new Connect('');
}

export class Invite {
	constructor(sender, recipient) {
		this.sender = sender;
		this.recipient = recipient;
	}
	static instance = new Invite('', '');
}

export class Accept {
	constructor(sender, recipient) {
		this.sender = sender;
		this.recipient = recipient;
	}
	static instance = new Accept('', '');
}

export class Reject {
	constructor(sender, recipient) {
		this.sender = sender;
		this.recipient = recipient;
	}
	static instance = new Reject('', '');
}

export class Delete {
	constructor(sender, recipient) {
		this.sender = sender;
		this.recipient = recipient;
	}
	static instance = new Reject('', '');
}

// * Game
export class Hook {
	constructor(up, down) {
		this.up = up;
		this.down = down;
	}
	static instance = new Hook(false, false);
}

// ! Protocole ------------------------------------------------------------------------------

class WSS {
	static #insance;

	constructor() {
		if (WSS.#insance) return WSS.#insance;
		WSS.#insance = this;
	}

	// * frame, start, stop, pool, score, won, lost, invitations, error

	// ? Comminication Helpers
	Json({ message, target }) {
		const json = JSON.parse(message);
		const properties = Object.getOwnPropertyNames(json);
		const targetProperties = Object.getOwnPropertyNames(target);
		targetProperties.forEach((property) => {
			if (_.includes(properties, property) === false) throw new Error('Invalid JSON');
		});
		return json;
	}

	// ? Protocole Message Builders

	ErrorMessage(error) {
		return JSON.stringify(new Message({ event: 'ERROR', object: new WSError(error) }));
	}
	// * POOL
	HashMessage(username, img, hash) {
		return JSON.stringify(new Message({ event: 'Hash', object: new Hash(username, img, hash) }));
	}
	PoolMessage(getPoolers) {
		return JSON.stringify(new Message({ event: 'POOL', object: new Pool(getPoolers()) }));
	}
	InvitationMessage(getInvitions) {
		return JSON.stringify(new Message({ event: 'INVITATIONS', object: new Invitations(getInvitions()) }));
	}
	// * GAME
	StartMessage() {
		return JSON.stringify(new Message({ event: 'START', object: new Start() }));
	}
	StopMessage() {
		return JSON.stringify(new Message({ event: 'STOP', object: new Stop() }));
	}
	FrameMessage(ball, rightPaddle, leftPaddle) {
		return JSON.stringify(new Message({ event: 'FRAME', object: new Frame(ball, rightPaddle, leftPaddle) }));
	}
	ScoreMessage(player, opponent) {
		return JSON.stringify(new Message({ event: 'SCORE', object: new Score(player, opponent) }));
	}
	LostMessage() {
		return JSON.stringify(new Message({ event: 'LOST', object: new Lost() }));
	}
	WonMessage() {
		return JSON.stringify(new Message({ event: 'WON', object: new Won() }));
	}
}

export const WS = new WSS();
