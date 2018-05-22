'use strict'

const Pusher = require('pusher')

const pusher = new Pusher({
  appId: '519956',
  key: 'e3237afa97c0003ea749',
  secret: '5a69519d334f7b4e2fdd',
  cluster: 'us2',
  encrypted: true
});

var sv = {}

sv.send = function (room, event, data) {
    pusher.trigger(room, event, data)
}

module.exports = sv