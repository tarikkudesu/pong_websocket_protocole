import { Ball, Paddle, Vector } from './protocole/game/index.js';
import { WS, Message, Frame, Start, Stop, Pool, Won, Lost, Score, WSError, Invitations, Hash, Pooler, Invitation } from './protocole/ws-server.js';

let message;
let messageJson;
let messageData;

message = WS.HashMessage('rick', 'img', 'asjhgkajhsfkjhsf');
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Hash.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Pool -----------------------------------------------------------
message = WS.InvitationMessage(function () {
	return [
		{ username: 'salam', img: '.img', invite_status: 'accepted' },
		{ username: 'kalam', img: '.img', invite_status: 'declined' },
		{ username: '3alam', img: '.img', invite_status: 'pending' },
	] as Invitation[];
});
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Invitations.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Pool -----------------------------------------------------------
message = WS.PoolMessage(function () {
	return [
		{ username: 'salam', img: 'salam' },
		{ username: 'kalam', img: 'kalam' },
		{ username: '3alam', img: '3alam' },
	];
});
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Pool.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Frame -----------------------------------------------------------
message = WS.FrameMessage(
	new Ball({ pos: new Vector(0, 0), radius: 0, velocity: new Vector(0, 0) }),
	new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) }),
	new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) })
);
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Frame.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Start -----------------------------------------------------------
message = WS.StartMessage();
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Start.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Stop -----------------------------------------------------------
message = WS.StopMessage();
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Stop.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Won -----------------------------------------------------------
message = WS.WonMessage();
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Won.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Lost -----------------------------------------------------------
message = WS.LostMessage();
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Lost.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Score -----------------------------------------------------------
message = WS.ScoreMessage(1, 6);
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: Score.instance });
console.log(messageData);
console.log('---------------------------------------------------');

// ! Error -----------------------------------------------------------
message = WS.ErrorMessage('not an error');
messageJson = WS.Json({ message: message, target: Message.instance });
console.log(messageJson);
messageData = WS.Json({ message: messageJson.data, target: WSError.instance });
console.log(messageData);
console.log('---------------------------------------------------');
