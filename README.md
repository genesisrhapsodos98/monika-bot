<b><h1 align="center">monika-bot</h1></b>

# Table of content
- [Table of content](#table-of-content)
- [About this project](#about-this-project)
- [Available commands](#available-commands)
- [Contribution guide](#contribution-guide)
  - [Adding commands](#adding-commands)
- [Github](#github)

# About this project

monika-bot is a [Discord](https://www.discordapp.com) bot written in NodeJS using the [discord.io](https://www.npmjs.com/package/discord.io) package.

# Available commands
| Command               | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| !commands             | the thing you just used                                              |
| !ping                 | Monika replies with pong!                                            |
| !setprefix `<prefix>` | set a prefix so you can command Monika with `<prefix>`!`<command>`   |
| !prefix               | show current prefix                                                  |
| !uwu `<true|false>`   | when set to true, Monika will uwu when her name is mentioned in chat |

# Contribution guide

## Adding commands

`monika-bot` listens to commands using the `respondTo` method found in `monika_respond.js`.
To add a command, simply add another case to the switch, code your logic under that case, then write a description for your command in [cmdinfo.txt](./cmdinfo.txt).

# Github

[monika-bot](https://github.com/genesisrhapsodos98/monika-bot)