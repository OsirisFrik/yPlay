'use strct'

const tools = require('../services/tools.sv')
var rooms = {}

var ctrl = {}

ctrl.getroom = function (req, res) {
    let room = req.params.room

    if (typeof rooms[room] !== 'undefined') {
        res.send(rooms[room])
    } else {
        res.status(404).send({status: false, message: 'Room no aviable'})
    }
}

ctrl.createRoom = function (req, res) {
    tools.generateRoom(room => {
        rooms[room] = {
            videos: [req.body.v_id],
            users: 1
        }

        res.send({room: room, data: rooms[room], status: true})
    })
}

module.exports = ctrl