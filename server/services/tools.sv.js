'use strict'

const rkey = require('random-key')

var tools = {}
var rooms = []

tools.generateRoom = function (cb) {
    let room =  rkey.generate(7)
    rooms.push(room)

    if (tools.validateRoom(room)) {
        cb(room)
    } else {
        tools.generateRoom(cb)
    }
}

tools.validateRoom = function (room) {
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i] === room) {
            return false
        } else {
            return true
        }
    }
}

module.exports = tools