const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  members: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Room
