const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  timeStamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Message
