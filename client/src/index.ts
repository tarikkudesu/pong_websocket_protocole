import { WS, Message, Connect, Invite, Play, Hook, WSError } from './protocole/ws-client.js';

// ! Connect -----------------------------------------------------------
const connect: string = WS.ConnectMessage('tarikkudesu', 'img/img', 'PAGE', 'query');
console.log(connect);
const connectJson: Message = WS.Json({ message: connect, target: Message.instance });
console.log(connectJson);
const connectData = WS.Json({ message: connectJson.data, target: Connect.instance });
console.log(connectData);
console.log('--------------------------------------------------------');

// ! Invite -----------------------------------------------------------
const invite: string = WS.InviteMessage('tarikkudesu', 'kisama');
console.log(invite);
const inviteJson: Message = WS.Json({ message: invite, target: Message.instance });
console.log(inviteJson);
const inviteData = WS.Json({ message: inviteJson.data, target: Invite.instance });
console.log(inviteData);
console.log('--------------------------------------------------------');

// ! Play -----------------------------------------------------------
const play: string = WS.PlayMessage('tarikkudesu', 'kisama');
console.log(play);
const playJson: Message = WS.Json({ message: play, target: Message.instance });
console.log(playJson);
const playData = WS.Json({ message: playJson.data, target: Play.instance });
console.log(playData);
console.log('--------------------------------------------------------');

// ! Hook -----------------------------------------------------------
const hook: string = WS.HookMessage(true, false);
console.log(hook);
const hookJson: Message = WS.Json({ message: hook, target: Message.instance });
console.log(hookJson);
const hookData = WS.Json({ message: hookJson.data, target: Hook.instance });
console.log(hookData);
console.log('--------------------------------------------------------');

// ! Error -----------------------------------------------------------
const error: string = WS.ErrorMessage('not an error');
const errorJson: Message = WS.Json({ message: error, target: Message.instance });
console.log(errorJson);
const errorData: WSError = WS.Json({ message: errorJson.data, target: WSError.instance });
console.log(errorData);
console.log('---------------------------------------------------');
