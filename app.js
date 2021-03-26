const { App } = require('@slack/bolt');
const schedule = require('node-schedule');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hi there, <@${message.user}> :wave:!`);
    // await publishMessage( "C01RC48QM60","testing");
  });


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
  var users = ["andrew.wong", "jenna.zhang", "candice.pang", "mikayla.louie", "rodolfo.landa", "kiki.ho", "ronan.fegan", "thomas.nakagawa"];
  var index = 0;
  const job = schedule.scheduleJob('0 9 * * 01', async function() {
    try {
      // Call the chat.postMessage method using the built-in WebClient
      const result = await app.client.chat.postMessage({
        // The token you used to initialize your app
        token: process.env.SLACK_BOT_TOKEN,
        channel: "C01RC48QM60",
        text: `This week's automato is: <@${users[(index++ % users.length)]}> :coffee:`
        // You could also use a blocks[] array to send richer content
      });
      // Print result, which includes information about the message (like TS)
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  })

})();
