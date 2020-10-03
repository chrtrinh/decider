const router = require('express').Router()
const {Message, User, Room} = require('../db/models')
const db = require('../db')
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
    user.addMessage(message)
    res.send(message)
  } catch (error) {
    next(error)
  }
})
