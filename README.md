
<p align="center">
    <a href="#"><img src="https://i.imgur.com/HZ0PD0v.jpg" /></a>
    <br />
    <br />
    <a href="https://spectrum.chat/dlive-api"><img alt="Spectrum" src="https://img.shields.io/badge/Spectrum-Chat-blue.svg?&style=for-the-badge"></a>
    <a href="https://github.com/timedotcc/dlivetv-unofficial-api/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/badge/License-Modified%20MIT-green.svg?style=for-the-badge"></a>
    <a href="https://nodei.co/npm/dlivetv-unofficial-api/"><img alt="npm" src="https://img.shields.io/npm/v/dlivetv-unofficial-api.svg?style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/dlivetv-unofficial-api"><img alt="npm" src="https://img.shields.io/npm/dm/dlivetv-unofficial-api.svg?style=for-the-badge"></a>
	  <br />
    <br />
    <a href="https://nodei.co/npm/dlivetv-unofficial-api/"><img src="https://nodei.co/npm/dlivetv-unofficial-api.png?mini=true"></a>
</p>


> dlivetv-unofficial-api is a wrapping API for the graphql hidden api provided from dlive.tv with a focus on ease of use and on performance. 

## Prerequisites
- Access token is required to use this module. Create an account on [dlive.tv](https://dlive.tv/) then follow our [wiki](https://github.com/dlive-apis/dlivetv-unofficial-api-js/wiki/Get-my-access-key) tutorial to get your token

## Installation
dlivetv-unofficial-api is free and easy to install
```bash
npm install dlivetv-unofficial-api --save
```
You can install it in yarn too
```bash
yarn add dlivetv-unofficial-api
```

## First Usage
```js
const  { Dlive } = require('dlivetv-unofficial-api')

const displayName = 'displayName' // Our streamer displayname (https://dlive.tv/displayName)
const accessKey = 'YOUR KEY' // Our access key (https://github.com/dlive-apis/dlivetv-unofficial-api-js/wiki/Get-my-access-key)

// Chat cooldown
const coolDown = 3000 // 3 seconds

// Parameter 1: displayName
// Parameter 2: Your access key for sending messages
let example = new Dlive(displayName, accessKey)

example.on('ChatText', (message) => {
  console.log(`Messages in Channel ${example.getChannel}: ${message.content}`)

  if (message.content === '!song') {
    example.sendMessage('Currently no track available...').then((result) => {
      console.log('Message sended!')
      console.log(result)
    }).catch((error) => {
      console.log(`Error while sending message! ${error}`)
      // Now we can use our function to try to resend, at this point you would directly use our own function. Please do not use this example in productive use, because it is ...
      sendMessage('Currently no track available...')
    })
  }
})

example.on('ChatFollow', (message) => {
  // Say thanks to this user for his follow!
  sendMessage(`Thanks for the follow, @${message.sender.displayname}`)
})

example.on('ChatGift', (message) => {
  // Say thanks to this user for his gift!
  sendMessage(`Thanks for ${message.amount}x ${message.gift}, @${message.sender.displayname}`)
})

// Get our channel information
example.getChannelInformation('pewdiepie' /* enter a displayname */).then((result) => {
  console.log(result)
}).catch(console.log)

example.util.getRisingCreators().then((result) => { // Let's see who's on the top of the ladder
  console.log(result)
}).catch(console.log)

function sendMessage (message) {
  example.sendMessage(message).catch((error) => {
    console.log(`Oh no.. error! ${error} - Retry in ${coolDown / 1000} seconds!`)
    setTimeout(sendMessage, coolDown, message)
  })
}
```
## Documentation
You can find more [examples](https://dlive.timedot.cc/node-js#examples) and [functions](https://dlive.timedot.cc/node-js/all-functions). For more information visit our [wiki](https://dlive.timedot.cc/).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/dlive-apis/dlivetv-api-js/tags). 

## Acknowledgements

- Some graphql queries were taken from [dlive-go-client](https://github.com/Dak425/dlive) written by @Dak425
- [Contributors](https://github.com/dlive-apis/dlivetv-api-js/graphs/contributors)

## See also

- [C#](https://github.com/dlive-apis/dlivetv-api-net) version of dlivetv-unofficial-api
