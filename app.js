const { App, ExpressReceiver } = require('@slack/bolt');
const serverlessExpress = require('@vendia/serverless-express');
// Initializes your app with your bot token and signing secret
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true
});

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    await say(`Hi there, <@${message.user}> :wave:!`);
  });

app.message('next', async ({ say }) => {
  var today = new Date();
  var weekNum = (today.getWeek() +1 ) % users.length;

  await say(`<@${users[weekNum]}> is \`next\` :meowcoffeespit:`);
});


app.message('schedule', async ({ say }) => {
  var today = new Date();
  var idx = today.getWeek() % users.length;
  var schedule = `*Here's the line up:* \n`;
  var count = 0;
  while (count < users.length) {
    schedule = schedule.concat(`${++count}. ${users[idx]}`, '\n');
    idx = ++idx % users.length;
  }

  await say(`${schedule}`);
});

app.message('on-call', async({say}) => {
  var today = new Date();
  var weekNum = today.getWeek() % users.length;

  await say(`<@${users[weekNum]}> is \`on-call\` :meow_coffee:`);
});

app.message('wakeup', async({say}) => {
  await say(`I'm awake! :meowcoffeespit:`)
});

var users = JSON.parse(process.env.USERS_LIST);

// Handle the Lambda function event
module.exports.handler = serverlessExpress({
  app: expressReceiver.app
});

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
  var dayOfYear = ((today - onejan + 86400000)/86400000);
  return Math.ceil(dayOfYear/7)
};