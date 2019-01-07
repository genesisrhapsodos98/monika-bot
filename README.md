<b><h1 align="center"><span style="color: crimson"> monika-bot </span></h1></b>

<h1><span style="color: indianred"> Table of content </span></h1>

- [ About this project ](#about-this-project)
- [ Available commands ](#available-commands)
- [ Contribution guide ](#contribution-guide)
  - [ Adding commands ](#adding-commands)
  - [ Helper functions ](#helper-functions)
    - [ saveConfig() ](#saveconfig)
    - [ getPrefixStringFromUser(userID) ](#getprefixstringfromuseruserid)
- [ Includes & dependencies ](#includes--dependencies)
- [ Repositories ](#repositories)

# <span style="color: indianred"> About this project </span>

monika-bot is a [Discord](https://www.discordapp.com) bot written in NodeJS using the [discord.io](https://www.npmjs.com/package/discord.io) package.

# <span style="color: indianred"> Available commands </span>
| Command               | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| !commands             | give a list of available commands                                    |
| !ping                 | Monika replies with pong!                                            |
| !setprefix `<prefix>` | set a prefix so you can command Monika with `<prefix>`!`<command>`   |
| !prefix               | show current prefix                                                  |
| !uwu `<true\|false>`   | when set to true, Monika will uwu when her name is mentioned in chat |

# <span style="color: indianred"> Contribution guide </span>

## <span style="color: olive"> Adding commands </span>

`monika-bot` listens to commands using the `respondTo` method found in `monika_respond.js`.
To add a command, simply add another case to the switch, code your logic under that case, then write a description for your command in [cmdinfo.txt](./cmdinfo.txt).

## <span style="color: olive"> Helper functions </span>

`monika-bot` comes with a set of helper functions to help make our code cleaner and more modular.

### <span style="color: darkcyan"> saveConfig() </span>

Saves the current `config` object to `config.json`

### <span style="color: darkcyan"> getPrefixStringFromUser(userID) </span>

Search for `userID` from the `user` field of the `prefixList` array in the `config` object
```js
{
  config: {
    // ...
    prefixList: [
      "user": /*userID*/,
      // ...
    ]
  }
}
```

# <span style="color: indianred"> Includes & dependencies </span>
[NodeJS](https://nodejs.org/)

[discord.io](https://www.npmjs.com/package/discord.io)

[Winston](https://www.npmjs.com/package/winston)



# <span style="color: indianred"> Repositories </span>

[Github](https://github.com/genesisrhapsodos98/monika-bot)