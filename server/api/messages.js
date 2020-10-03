const router = require('express').Router()
const {Message, User, Room} = require('../db/models')
const db = require('../db')
const {Op} = require('sequelize')
module.exports = router

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const result = await Message.findAll({
      attributes: ['id', 'message', 'timeStamp']
    })
    res.send(result)
  } catch (error) {
    next(error)
  }
})

// GET /api/messages/:userId
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  if (Number.isNaN(userId)) return res.sendStatus(400)
  try {
    const result = await Message.findByPk(userId, {
      attributes: ['id', 'message', 'timeStamp']
    })
    res.send(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send('Unauthorized action')
    }

    const message = await Message.create({
      message: req.body.message
    })

    const user = await User.findByPk(req.user.id)

    let membersCheck =
      req.user.id > req.body.receiverId
        ? [req.body.receiverId, req.user.id]
        : [req.user.id, req.body.receiverId]

    console.log('this is the members check , ', membersCheck)

    const room = await Room.findOne({
      where: {
        members: membersCheck
      }
    })

    console.log(room)

    await user.addMessage(message)
    await room.addMessage(message)

    const retMessage = await Message.findByPk(message.id, {
      attributes: ['id', 'message', 'timeStamp']
    })

    let returnObj = {
      id: retMessage.id,
      message: retMessage.message,
      timeStamp: retMessage.timeStamp,
      user: user
    }

    res.send(returnObj)
  } catch (error) {
    next(error)
  }
})
