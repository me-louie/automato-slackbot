# automato-slackbot
A very basic slackbot which @ notifies users on a set weekly rotation schedule. To change the users or order of users in the rotation, simply modify the `users` list. The following commands are supported:
* `on-call`: @ notifies the person on-call this week.
* `next`: @ notifies the person on-call next week.
* `schedule`: reports an ordered on-call rotation list.
* `help`: prompts the user to try commands `on-call`, `next`, or `schedule`.
