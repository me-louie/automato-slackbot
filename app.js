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
  var weekNum = (today.getWeekNumber() +1 ) % users.length;

  await say(`<@${users[weekNum]}> is \`next\` :meowcoffeespit:`);
});


app.message('schedule', async ({ say }) => {
  var today = new Date();
  var idx = today.getWeekNumber() % users.length;
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
  var weekNum = today.getWeekNumber() % users.length;

  await say(`<@${users[weekNum]}> is \`on-call\` :meow_coffee:`);
});

app.message('wakeup', async({say}) => {
  await say(`I'm awake! :meowcoffeespit:`);
});

var users = JSON.parse(process.env.USERS_LIST);

// Handle the Lambda function event
module.exports.handler = serverlessExpress({
  app: expressReceiver.app
});

// For a given date, get the ISO week number. Weeks begin on Monday
Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};