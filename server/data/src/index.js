import WS from './protocole/ws-server.js';
import Ball from './protocole/game/Ball.js';
import Paddle from './protocole/game/Paddle.js';
import Vector from './protocole/game/Vector.js';

console.log(
	WS.FrameMessage(
		new Ball({ pos: new Vector(0, 0), radius: 0, velocity: new Vector(0, 0) }),
		new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) }),
		new Paddle({ start: new Vector(0, 0), end: new Vector(0, 0), radius: 0, constrains: new Vector(0, 0) })
	)
);
console.log(WS.StartMessage());
console.log(WS.StopMessage());
