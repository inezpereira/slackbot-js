/* CPC Social Slackbot

Type "yarn start" on your Terminal to run this.

Resources:
- Helpful video tutorial: https://www.youtube.com/watch?v=AajBk59nOgw
- How to create a classic App: https://api.slack.com/apps?new_classic_app=1

Inês Pereira, July 2021

Made with ❤️ for the CPC Zurich 2021

Instructions for actual game:
- Before the game starts: Edge, Chrome or Brave
- Open up Zoom meeting and breakout rooms
- Caution them not to use Topia as a 1ary source of communication (people can overhear you!)

Input from session on 12.08:
- Klaas: how do I know where the 1st challenge is? (should be solved with current text)

TODO:
- What's the prize? A Giant microbe plush? A book voucher? An e-book?
*/


import { RTMClient }  from '@slack/rtm-api'
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL, BOT_MONITORING_CHANNEL } from './constants'
import  { WebClient } from '@slack/web-api';
const packageJson = require('../package.json')

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

const TEAMS = {
    // 'U021TSUUXKL': '1', // Inês
    'U029VAS34MQ': '2', // Rike
    'U0226FT3T33': '3', // Katharina
    'U0226FSRMA5': '4'  // Nicole
}

// TODO: complete this list as needed
const CHANNELS_TO_IGNORE = [
    'C022HMKJ4N4', // #chairs
    'C02AZQ2KCRY', // #cpc-challenge
    'C021QQKBPQD', // #general
    'C0250R9TJJZ', // #job-postings
    'C0254488JTD', // #q_and_a
    'C022HM1V53J', // #random
    'C024X4K5YCW', // #resources
    'C021M4K3F54', // #social
    'C021TTAJNV8', // #speakers-main-course
    'C029NRLFLRL', // #speakers-tutorials
    'C027ZS61NDC', // #test
    'C021U43HAPM', // #tutorial-helpdesk
    'C025A2XQ96Y' // #zoom
]

const CPC_CHALLENGE_CHANNEL = ['C02AZQ2KCRY']

rtm.start()
  .catch(console.error);

rtm.on('ready', async () => {
    console.log('bot started')
    sendMessage(BOT_SPAM_CHANNEL, `Social Bot version ${packageJson.version} is online. Let the games begin!
:warning: Remember: read all my instructions VERY CAREFULLY! :face_with_monocle:. 
You will end up *saving time* and *increasing your chances of winning* if you do so.
The first thing you need to do it to send me a direct message with the text: !start
You can send me a direct message by clicking on my name and then on 'Go to App'.

(Do not message Slackbot. Message me, the better, improved, more intelligent *Social Bot*!)
If you run into issues or have questions, type the following into this channel: !help`)
})

rtm.on('slack_event', async (eventType, event) => {
    if (event && event.type === 'message'){
        if (event.text === "!start") {
            hello(event.channel, event.user)
        } else if (event.text === "!ready"){
            start(event.channel)
        } else if (event.text === "!help"){
            help(event.channel,event.user)
        } else if (event.text.toLowerCase() === "bayes"){
            bayes(event.channel, event.user)
            notify_admin(event.user,'1')
        } else if (event.text.toLowerCase() === "ode"){
            ode(event.channel, event.user)
            notify_admin(event.user,'2')
        } else if (event.text.toLowerCase() === "ijk"){
            ijk(event.channel, event.user)
            notify_admin(event.user,'3')
        } else if (event.text.toLowerCase() === "anhedonia"){
            anhedonia(event.channel)
            notify_admin(event.user,'4')
        } else if (event.text.toLowerCase() === "maximum likelihood estimation"){
            maximum_likelihood(event.channel)
            notify_admin_winner(event.user)
        }
    }
})


function hello (channelId, userId) {
    sendMessage(channelId,`:tada: Heya <@${userId}>! Welcome to the CPC Zurich 2021 special social program! :tada:
In this challenge, you and your teammates will be given multiple puzzles to solve. This first team to solve all puzzles will win a special prize! :gift:
Don't worry too much about instructions right now: these will be provided along the way, along with the necessary passwords to unlock the several challenges.
Are you ready to start? If so, type: !ready`)
    // sendMessage(channelId, `:surfer: Check out this link: https://topia.io/cpc-game-free-0og8rqwlh <@${userId}>`)
}

function start (channelId) {
    sendMessage(channelId, `Awesome. For your first challenge, find the mysterious cookie :cookie: in our surfers' Topia room :surfer: https://topia.io/cpc-game :palm_tree:
Once you have found it and solved the puzzle, type the solution into this chat.
Hint: the real lyrics are not the actual answer, but the solution is similar! Think: "nerdy, CPC-related wordplay!"`)
}

function help (channelId, userId) {
    sendMessageToChallengeChannel(channelId, `<@${'U021TSUUXKL'}> Could you help?
In the meantime, <@${userId}>, please describe your issue.`)
}

function bayes (channelId){
    sendMessage(channelId, `YES!! :notes: Because you know I'm all about about that Bayes, 'bout that Bayes, no trouble :notes:... 
What do you mean, those are not the actual lyrics? Hmm, I prefer this version :nerd_face:
Anyway: congrats on making it through your first challenge! 
Next, go back to the Topia room and find the 20-faced die. The password is: frontier-psychiatrist
Solve the riddle and type the solution into this chat.`)
}

function ode (channelId,userId){
    sendMessage(channelId,`<@${userId}> strikes again! Next, what is, according to Hamilton, equal to negative one? 
For this challenge, check out https://www.youtube.com/watch?v=SZXHoWwBcDc
Type the solution into this chat.`)
}

function ijk (channelId){
    sendMessage(channelId,`🎶 i-jay-kaaaaay 🎶 I hope you enjoyed this Science version of Lin-Manuel Miranda's "Alexander Hamilton". 
For this next challenge, be sure to brainstorm with your team! Rebus puzzles are much more fun thay way :smiley:! In case you don't know: a Rebus puzzle is a picture representation of a word or a phrase.
All right, go back to the Topia room and find the canvas by the sea. The password is: quaternion-musical
Once again, type the solution into this chat.`)
}

function anhedonia (channelId){
    sendMessage(channelId,`All right, last challenge! Find the radio in the Topia room and solve the new Rebus puzzle!
The password is: the-!ast-R3bu5
Once again, type the solution into this chat.`)
}

function maximum_likelihood (channelId){
    sendMessage(channelId,`You've made it! QUICK!! Type your *team number* and copy and paste the *passphrase* into the #cpc-challenge channel to claim your prize!
The passphrase is: Your body has run out of magnesium! 0Mg...`)
}

function notify_admin (userId, challengeNumber){
    if (userId in TEAMS) {
        sendMessage(BOT_MONITORING_CHANNEL,`<@${userId}> from Team ${TEAMS[userId]} has solved challenge number ${challengeNumber}`);
    } else {
        sendMessage(BOT_MONITORING_CHANNEL,`Warning: Unregistered user <@${userId}> has just solved challenge number ${challengeNumber}`);
    }
}

function notify_admin_winner (userId){
    if (userId in TEAMS) {
        sendMessage(BOT_MONITORING_CHANNEL,`<@${userId}> from Team ${TEAMS[userId]} has just solved the final challenge! Expect a message in the #cpc-challenge channel!`)
    } else {
        sendMessage(BOT_MONITORING_CHANNEL,`:warning: Warning: Unregistered user <@${userId}> has just solved the final challenge! :warning:`)
    }
}

async function sendMessage(channel, message) {
    if (!CHANNELS_TO_IGNORE.includes(channel)){
        await web.chat.postMessage({
            channel: channel,
            text: message,
        })
    }
}

async function sendMessageToChallengeChannel(channel, message) {
    if (CPC_CHALLENGE_CHANNEL.includes(channel)){
        await web.chat.postMessage({
            channel: channel,
            text: message,
        })
    }
}
