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
    res.status(500).send({
      message: 'video id not valid'
    })
  }
}

ctrl.newMessage = function (req, res) {
  console.log(req.body);
  pusher.send(req.params.room, 'new-msg', req.body)
  res.status(200).send({
    status: true
  })
}

ctrl.addVideo = function (req, res) {
  console.log(req.body);
  var room = req.params.room

  if (typeof req.body.v_id !== 'undefined') {
    rooms[room].videos.push(req.body.v_id)
    let msg = {
      username: 'System',
      message: `User ${req.body.username} add video to playlist`
    }
    pusher.send(room, 'addVideo', req.body.v_id)
    pusher.send(room, 'new-msg', msg)
    res.status(200).send({
      status: true
    })
  } else {
    res.status(400).send({
      status: false,
      message: 'No video id'
    })
  }
}

ctrl.searchVideo = function (req, res) {  
  tools.searchVideo(req.body.search, (result, data) => {
    if (result) {
      res.status(200).send({videos: data, status: true})
    } else {
      res.status(500).send({status: false, message: 'Error'})
    }
  })  
}

ctrl.deleteVideo = function (req, res) {
  var room = req.params.room
  var v_id = req.query.v_id

  var index = tools.getIndex(rooms[room].videos, null, v_id)
  console.log(index);
  
  
  if (index > -1) {
    rooms[room].videos.splice(index, 1)
  }
  
  res.status(200).send({status: true})
}

module.exports = ctrl
