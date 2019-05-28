'use strict'
const { expect } = require('chai')
const { Dlive } = require('../src/index');
const channelName = 'abc'
const authKey = 'accessToken'
let channel = new Dlive('test', 'abc');
const main = async () => {
  describe('Validating values', function () {
    it('Should be equal values', function () {
      expect(channel.getChannel).to.equal(channelName)
      expect(channel.getAuthkey).to.equal(authKey)
    })

    it('Result should be null because no valid authkey', function () {
      channel.getChannelInformation('pewdiepie').then(res => {
        expect(res).to.be.null()
      }).catch(console.log)

      channel.getChannelViewers('pewdiepie').then(res => {
        expect(res).to.be.null()
      }).catch(console.log)

      channel.getChannelFollowers('sampepper', 20).then(res => {
        expect(res).to.be.null()
      }).catch(console.log)
    })
  })
}

(async () => {
  await main()
  setTimeout(_ => {
    process.exit(0)
  }, 4500)
})()
