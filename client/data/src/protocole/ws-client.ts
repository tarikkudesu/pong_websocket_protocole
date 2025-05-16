import _ from 'lodash';

// ! shared -----------------------------------------------------------------------------

interface MessageProps {
	event: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	object: any;
}

export class Message {
	public message: string;
	public data: string;
	constructor({ event, object }: MessageProps) {
		this.message = event;
		this.data = JSON.stringify(object);
	}
	public static instance = new Message({ event: '', object: {} });
}

export class Invitation {
	public username: string = '';
	public img: string = '';
	public invite_status: string = '';
	constructor() {}
	static instance = new Invitation();
}

export class WSError {
	public message: string;
	constructor(error: string) {
		this.message = error;
	}
	static instance = new WSError('');
}

// ! res --------------------------------------------------------------------------------

// * Pool
export class Connect {
	// TODO: initial game data can be added here
	username: string;
	img: string;
	page: string;
	query: string;
	constructor(username: string, img: string, page: string, query: string) {
		this.username = username;
		this.query = query;
		this.page = page;
		this.img = img;
	}
	public static instance = new Connect('', '', '', '');
}

export class Invite {
	sender: string;
	recipient: string;
	constructor(sender: string, recipient: string) {
		this.sender = sender;
		this.recipient = recipient;
	}
	public static instance = new Invite('', '');
}

export class Accept {
	sender: string;
	recipient: string;
	constructor(sender: string, recipient: string) {
		this.sender = sender;
		this.recipient = recipient;
	}
	public static instance = new Accept('', '');
}

export class Reject {
	sender: string;
	recipient: string;
	constructor(sender: string, recipient: string) {
		this.sender = sender;
		this.recipient = recipient;
	}
	public static instance = new Reject('', '');
}

export class Delete {
	sender: string;
	recipient: string;
	constructor(sender: string, recipient: string) {
		this.sender = sender;
		this.recipient = recipient;
	}
	public static instance = new Delete('', '');
}

// * Game
export class Hook {
	up: boolean;
	down: boolean;
	constructor(up: boolean, down: boolean) {
		this.up = up;
		this.down = down;
	}
	public static instance = new Hook(false, false);
}

// ! req --------------------------------------------------------------------------------

// * Pool
export class Hash {
	username: string = '';
	hash: string = '';
	img: string = '';
	constructor() {}
	static instance = new Hash();
}

export class Pooler {
	public username: string;
	public profile: string;
	constructor(username: string, profile: string) {
		this.username = username;
		this.profile = profile;
	}
	static instance = new Pooler('', '');
}

export class Pool {
	public pool: Pooler[];
	constructor(pool: Pooler[]) {
		this.pool = pool;
	}
	static instance = new Pool([]);
}

export class Invitations {
	public invitations: User[];
	constructor(invitations: User[]) {
		this.invitations = invitations;
	}
	static instance = new Invitations([]);
}

export class Frame {
	ballX: number = 0;
	ballY: number = 0;
	ballRadius: number = 0;
	paddleRadius: number = 0;
	leftPaddleTopX: number = 0;
	leftPaddleTopY: number = 0;
	rightPaddleTopX: number = 0;
	rightPaddleTopY: number = 0;
	leftPaddleBottomX: number = 0;
	leftPaddleBottomY: number = 0;
	rightPaddleBottomX: number = 0;
	rightPaddleBottomY: number = 0;
	constructor() {}
	public static instance = new Frame();
}

export class Lost {
	public lost: string;
	constructor() {
		this.lost = 'lost';
	}
	static instance = new Lost();
}

export class Score {
	public player: number;
	public opponent: number;
	constructor(player: number, opponent: number) {
		this.player = player;
		this.opponent = opponent;
	}
	static instance = new Score(0, 0);
}

export class Start {
	public start: string;
	constructor() {
		this.start = 'start';
	}
	public static instance = new Start();
}

export class Stop {
	public stop: string;
	constructor() {
		this.stop = 'stop';
	}
	public static instance = new Stop();
}

export class Won {
	public won: string;
	constructor() {
		this.won = 'won';
	}
	static instance = new Won();
}

// ! Protocole ------------------------------------------------------------

interface JsonProps {
	message: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	target: any;
}

class WSC {
	private static instance: WSC | null;
	constructor() {
		if (WSC.instance) return WSC.instance;
		WSC.instance = this;
	}

	// * connect, invite, play, hook

	// ? Comminication Helpers
	Json({ message, target }: JsonProps) {
		const json = JSON.parse(message);
		const properties = Object.getOwnPropertyNames(json);
		Object.getOwnPropertyNames(target).forEach((property) => {
			if (_.includes(properties, property) === false) throw new Error('Invalid JSON');
		});
		return json;
	}

	// ? Protocole Message Builders
	ConnectMessage(username: string, img: string, page: string, query: string): string {
		return JSON.stringify(new Message({ event: 'CONNECT', object: new Connect(username, img, page, query) }));
	}
	InviteMessage(from: string, to: string): string {
		return JSON.stringify(new Message({ event: 'INVITE', object: new Invite(from, to) }));
	}
	PlayMessage(username: string, opponent: string): string {
		return JSON.stringify(new Message({ event: 'PLAY', object: new Play(username, opponent) }));
	}
	HookMessage(up: boolean, down: boolean): string {
		return JSON.stringify(new Message({ event: 'HOOK', object: new Hook(up, down) }));
	}
	ErrorMessage(error: string) {
		return JSON.stringify(new Message({ event: 'ERROR', object: new WSError(error) }));
	}
}

export const WS = new WSC();
