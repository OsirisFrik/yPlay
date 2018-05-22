'use strct'

const tools = require('../services/tools.sv')
const pusher = require('../services/pusher.sv')
var rooms = {}

var ctrl = {}

ctrl.getroom = function (req, res) {
  let room = req.params.room

  if (typeof rooms[room] !== 'undefined') {
    res.send({
      status: true,
      room: rooms[room]
    })
  } else {
    res.status(404).send({
      status: false,
      message: 'Room not available'
    })
  }
}

ctrl.createRoom = function (req, res) {
  if (typeof req.body.v_id !== 'undefined') {
    tools.generateRoom(room => {
      rooms[room] = {
        videos: [req.body.v_id],
        users: 1
      }

      res.send({
        room: room,
        data: rooms[room],
        status: true
      })
    })
  } else {
    res.status(500).send({message: 'video id not valid'})
  }
}

ctrl.newMessage = function (req, res) {
  console.log(req.body);
  pusher.send(req.params.room, 'new-msg', req.body)
  res.status(200).send({status: true})
}

module.exports = ctrl
