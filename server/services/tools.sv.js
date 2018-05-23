'use strict'

const rkey = require('random-key')
const ys = require('youtube-search')

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

tools.searchVideo = function (query, cb) {
    var opts = {
        maxResults: 10,
        key: 'AIzaSyB9fARo3z9RI9GYccoB4p7AxWg5k9r7wlM'
    }
    ys(query, opts, (err, res) => {
        if (err) {
            cb(false)
        } else {
            cb(true, res)
        }
    })
}

tools.getIndex = function (data, compare, value) {
    if (Array.isArray(data)) {
        return data.findIndex(item => {
            if (compare !== null) {
                return item[compare] === value
            } else {
                return item === value
            }
        })
    }
}

module.exports = tools