import Message from './protocole/shared/Message.js';
import WS from './protocole/ws-client.js';
import WSError from './protocole/shared/WSError.js';

// ! Connect -----------------------------------------------------------
const connect: string = WS.ConnectMessage('tarikkudesu');
console.log(connect);
const connectJson: Message = WS.Json({ message: connect, target: WS.Message.instance });
console.log(connectJson);
const connectData = WS.Json({ message: connectJson.data, target: WS.Connect.instance });
console.log(connectData);
console.log('--------------------------------------------------------');

// ! Invite -----------------------------------------------------------
const invite: string = WS.InviteMessage('tarikkudesu', 'kisama');
console.log(invite);
const inviteJson: Message = WS.Json({ message: invite, target: WS.Message.instance });
console.log(inviteJson);
const inviteData = WS.Json({ message: inviteJson.data, target: WS.Invite.instance });
console.log(inviteData);
console.log('--------------------------------------------------------');

// ! Play -----------------------------------------------------------
const play: string = WS.PlayMessage('tarikkudesu', 'kisama');
console.log(play);
const playJson: Message = WS.Json({ message: play, target: WS.Message.instance });
console.log(playJson);
const playData = WS.Json({ message: playJson.data, target: WS.Play.instance });
console.log(playData);
console.log('--------------------------------------------------------');

// ! Hook -----------------------------------------------------------
const hook: string = WS.HookMessage(true, false);
console.log(hook);
const hookJson: Message = WS.Json({ message: hook, target: WS.Message.instance });
console.log(hookJson);
const hookData = WS.Json({ message: hookJson.data, target: WS.Hook.instance });
console.log(hookData);
console.log('--------------------------------------------------------');

// ! Error -----------------------------------------------------------
const error: string = WS.ErrorMessage('not an error');
const errorJson: Message = WS.Json({ message: error, target: WS.Message.instance });
console.log(errorJson);
const errorData: WSError = WS.Json({ message: errorJson.data, target: WS.WSError.instance });
console.log(errorData);
console.log('---------------------------------------------------');
