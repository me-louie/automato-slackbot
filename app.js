const { App } = require('@slack/bolt');
const schedule = require('node-schedule');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    await say(`Hi there, <@${message.user}> :wave:!`);
  });

app.message('next', async ({ message, say }) => {
  const next = (index+1) % users.length;
  await say(`<@${users[next]}> is next :meow_dance:`);
});

var users = ["andrew.wong", "jenna.zhang", "candice.pang", "mikayla.louie", "rodolfo.landa", "kiki.ho", "ronan.fegan", "thomas.nakagawa"];
var index = 7;

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
  const job = schedule.scheduleJob('0 9 * * 01', async function() {
    try {
      const result = await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: "C01RB6T20DS",
        text: `This week's automato is: <@${users[(index++ % users.length)]}> :coffee:`
      });
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  })
})();
