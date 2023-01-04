import tmi from 'tmi.js'
import { CHANNEL_NAME , OAUTH_TOKEN , BOT_USERNAME, BLOCKED_WORDS } from './constants'

const options = {
    options: { debug: true },
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options);

client.connect();

client.on('message', (channel, userstate, message, self) => {
	// Ignore echoed messages.
	if(self) return;
    
	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${userstate.username}, heya!`);
	}

    checkTwitchChat(userstate, message, channel)
});

function checkTwitchChat(userstate, message, channel){
    message = message.toLowerCase();
    let shouldSendMessage = false;

    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()));

    if(shouldSendMessage){
        client.say(channel, `@${userstate.username}, WeirdChamp`);
        client.deletemessage(channel, userstate.id);
    }
}