import WS from './protocole/ws-client.js';


const connect: string = WS.ConnectMessage(new WS.Connect('tarikkudes'));
const invite: string = WS.InviteMessage(new WS.Invite('tarikkudesu', 'kisama'));
const play: string = WS.PlayMessage(new WS.Play('tarikkudesu', 'kisama'));
const hook: string = WS.HookMessage(new WS.Hook(true, false));
console.log(connect);
console.log(invite);
console.log(play);
console.log(hook);

console.log('################');

console.log(WS.Json({message: connect, target: WS.Message.instance}));
console.log(WS.Json({message: invite, target: WS.Message.instance}));
console.log(WS.Json({message: play, target: WS.Message.instance}));
console.log(WS.Json({message: hook, target: WS.Message.instance}));

