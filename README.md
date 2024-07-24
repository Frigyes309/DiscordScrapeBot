# harken-bot v.2

A discord eavesdropper bot, that backs up your text messages to a database with all the related information.

## Features

-   Keeping track of messages, replies, reactions
-   Keeping track of channels and threads
-   Slash commands to blacklist channels from tracking
-   React to channel and user renames
-   Intelligent message prefetching on startup

## Deployment

-   Required discord application settings and permissions
    -   Privileged gateway intents: `GUILD_MEMBERS`, `MESSAGE_CONTENT`
    -   Permissions: Read Messages/View Channels, Read Message History, Send Messages (68608)
-   Before the following environment variables must be set:
    -   `DISCORD_TOKEN`: discord application token
-   The bot comes with a docker-compose file, so simply typing `docker-compose up` starts and deploys the bot.
    -   _(docker and docker-compose need to be installed and configured on the machine first)_

# Commands

-   /help: Lists all the available commands with their descriptions.
-   /ping: Pings the bot.
-   /ignore [optional: #channel-name]: Ignores the channel from tracking (can be used on multiple channels and threads). If no argument is provided, the current channel is ignored.
-   /unignore [optional: #channel-name]: Unignores the channel from tracking (can be used on multiple channels and threads). If no argument is provided, the current channel is unignored. By default all channels are tracked.
-   /list: Lists all the ignored channels and threads.
