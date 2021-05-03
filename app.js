const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
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

app.message('help', async({say}) => {
  await say(`Try \`on-call\`, \`next\`, or \`schedule\` for more information!`);
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

app.message('test', async({say}) => {
  await say('Testing GitHub integration manual deploy');
});

var users = ["mikayla.louie", "rodolfo.landa", "kiki.ho", "ronan.fegan", "thomas.nakagawa", "andrew.wong", "jenna.zhang", "candice.pang"];

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
  var dayOfYear = ((today - onejan + 86400000)/86400000);
  return Math.ceil(dayOfYear/7)
};