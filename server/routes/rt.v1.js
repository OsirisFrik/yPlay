'use strict'

const express = require('express')
const v1 = require('../controllers/api.v1')

var rt = express.Router()

rt.get('/:room', v1.getroom)

rt.post('/createroom', v1.createRoom)

module.exports = rt