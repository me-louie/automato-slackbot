# automato-slackbot
*automato* is a basic slackbot which **@ notifies** on-call users on a set weekly rotation schedule. To change the users or order of users in the rotation, simply modify the `USERS_LIST` environmental variable. The following commands are currently supported by *automato*:
* `on-call`: **@ notifies** the person on-call this week.
* `next`: **@ notifies** the person on-call next week.
* `schedule`: reports an ordered on-call rotation list.

## Changing The Rotation List
If you wish to change the on-call rotation list,  you can simply edit the `USERS_LIST` environmental variable in the AWS console.

## Getting Started
After cloning the repo, run `npm install` to install dependencies.

## Local development
To set your local environmental variables, run the following commands in Bash:

`export SLACK_SIGNING_SECRET=<your-signing-secret>`

`export SLACK_BOT_TOKEN=xoxb-<your-bot-token>`

`export USERS_LIST=<your-users-list>`

The `SLACK_SIGNING_SECRET` and `SLACK_BOT_TOKEN` can be found on the [app configuration page](https://api.slack.com/apps) under  **Basic Information** and **OAuth & Permissions** respectively. The `USERS_LIST` has format `'["user1", "user2", "user3"]'`, where the users are the Slack user handles.
#
The **Request URL** is a public URL where Slack will send HTTP POST requests corresponding to the events that you specify. This URL can be found on your app configuration page, under **Event Subscriptions**. For local development, you can use `ngrok` to forward Slack events to your local machine.

1. To run the bot locally, use:

   `npx serverless offline --noPrependStageInUrl`.

2. Use [ngrok](https://ngrok.com/download) to forward Slack events to your local machine, i.e.: 

   `ngrok http 3000`

3. Update your app's **Request URL** with the URL given by ngrok. The base URL should look something like `https://abc123.ngrok.io`. Append `/slack/events` to the URL.
You can now develop your app locally.

## Deploying An Update
Once you are happy with your updates, you can deploy an update to AWS Lambda. 
1. In order to generate your AWS credentials/profile, use [bmx](https://github.com/Brightspace/bmx).

   `bmx write --org d2l --profile temp`

2. Then, you can use serverless to deploy the app to AWS.

   `AWS_PROFILE=temp npx serverless deploy`

3. After a successful deployment, note the POST endpoint outputted in console, i.e.

   `https://abcdefghij.execute-api.us-east-1.amazonaws.com/dev/slack/events`

   If necessary, update your **Request URL** to this new hosted version. *automato* should be updated :tada:!

#
This bot was built following Slack's guides for [Getting Started with Bolt for JS](https://slack.dev/bolt-js/tutorial/getting-started#setting-up-events) and [Deploying to AWS Lambda](https://slack.dev/bolt-js/deployments/aws-lambda).
