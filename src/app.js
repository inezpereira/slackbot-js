import { RTMClient }  from '@slack/rtm-api'
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants'
import  { WebClient } from '@slack/web-api';
const packageJson = require('../package.json')

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

rtm.start()
  .catch(console.error);

rtm.on('ready', async () => {
    console.log('bot started')
    sendMessage(BOT_SPAM_CHANNEL, `Bot version ${packageJson.version} is online. Send me a direct message with the text: !start`)
})

rtm.on('slack_event', async (eventType, event) => {
    if (event && event.type === 'message'){
        if (event.text === "!start") {
            hello(event.channel, event.user)
        } else if (event.text === "!ready"){
            start(event.channel)
        } else if (event.text.toLowerCase() === "bayes"){
            bayes(event.channel, event.user)
        } else if (event.text.toLowerCase() === "ode"){
            ode(event.channel, event.user)
        } else if (event.text.toLowerCase() === "ijk"){
            ijk(event.channel, event.user)
        } else if (event.text.toLowerCase() === "anhedonia"){
            anhedonia(event.channel)
        }
    }
})


function hello (channelId, userId) {
    sendMessage(channelId,`:tada: Heya <@${userId}>! Welcome to the CPC Zurich 2021 special social programme! :tada:
In this challenge, you and your teammates will be given multiple puzzles to solve. This first team to solve all puzzles will win a special prize! :gift:
Don't worry too much about instructions now: these will be provided along the way.
Are you ready to start? If so, type: !ready`)
    // sendMessage(channelId, `:surfer: Check out this link: https://topia.io/cpc-game-free-0og8rqwlh <@${userId}>`)
}

function start (channelId) {
    sendMessage(channelId, `Awesome. For your first challenge, find the secret puzzle in our surfers Topia room :surfer: : https://topia.io/cpc-game-free-0og8rqwlh
Once you have found and solved the puzzle, type the solution into this chat.`)
}

function bayes (channelId){
    sendMessage(channelId, `YES!! :notes: Because you know I'm all about about that Bayes, 'bout that Bayes, no trouble :notes:... What do you mean, that's not the actual lyrics? Hmm, I prefer this version :nerd_face:
Anyway: congrats on making it through your first challenge! 
Next, go back to the Topia room and find the 20-faced die. The password is: frontier-psychiatrist
Solve the riddle and type the solution into this chat.`)
}

function ode (channelId,userId){
    sendMessage(channelId,`<@${userId}> strikes again! Next, what is equal to negative one? 
(Hint: check out https://www.youtube.com/watch?v=SZXHoWwBcDc)
Type the solution into this chat.`)
}

function ijk (channelId,userId){
    sendMessage(channelId,`🎶 i-jay-kaaaaay 🎶 I hope you enjoyed this Science version of Lin-Manuel Miranda's "Alexander Hamilton". 
For this next challenge, be sure to brainstorm with your team! Rebus puzzles are much more fun thay way :smiley:!
Go back to the Topia room and find the canvas by the sea. The password is: quaternion-musical
Once again, type the solution into this chat.`)
}

function anhedonia (channelId){
    sendMessage(channelId,`You've made it! QUICK!! 
Type your team number and copy and paste the passphrase into the #cpc-challenge and claim your prize!
The passphrase is: Your body has run out of magnesium! 0Mg...`)
}

async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}

// Type "yarn start" on your Terminal to run this.
// Video tutorial: https://www.youtube.com/watch?v=AajBk59nOgw
// How to create a classic App: https://api.slack.com/apps?new_classic_app=1
