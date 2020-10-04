const {Op} = require('sequelize')
const router = require('express').Router()
const {User, Message} = require('../db/models')
const Room = require('../db/models/room')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  if (Number.isNaN(userId)) return res.sendStatus(400)
  try {
    let user = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'imageUrl']
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/chats', async (req, res, next) => {
  const {userId} = req.params
  if (Number.isNaN(userId)) return res.sendStatus(400)
  try {
    let messages = await Message.findAll({
      attributes: ['id', 'message', 'timeStamp'],
      where: {
        userId
      },
      include: [User, Room]
    })

    let outputArr = []

    if (messages.length === 0) {
      let rooms = await Room.findAll({
        where: {
          members: {
            [Op.contains]: [req.user.id]
          }
        }
      })

      let roomsArray = rooms.map(room => {
        const {members} = room
        members.forEach(memberId => {
          if (parseInt(memberId, 10) !== parseInt(userId)) {
            outputArr.push(parseInt(memberId, 10))
          }
        })
      })
    } else {
      let membersArray = messages.map(message => {
        const {members} = message.room
        members.forEach(memberId => {
          if (parseInt(memberId, 10) !== parseInt(userId)) {
            outputArr.push(parseInt(memberId, 10))
          }
        })
      })
    }

    let results = await User.findAll({
      where: {
        id: {
          [Op.in]: outputArr
        }
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'imageUrl']
    })

    res.send(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/chats/', async (req, res, next) => {
  const {userId, id} = req.params
  if (Number.isNaN(userId)) return res.sendStatus(400)
  try {
    let messages = await Message.findAll({
      attributes: ['id', 'message', 'timeStamp'],
      where: {
        userId
      },
      include: [User, Room]
    })

    let outputArr = []

    let membersArray = messages.map(message => {
      const {members} = message.room
      members.forEach(memberId => {
        if (parseInt(memberId, 10) !== parseInt(userId)) {
          outputArr.push(parseInt(memberId, 10))
        }
      })
    })

    let results = await User.findAll({
      where: {
        id: {
          [Op.in]: outputArr
        }
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'imageUrl']
    })

    res.send(results)
  } catch (err) {
    next(err)
  }
})

router.get('/chats/:userId/', async (req, res, next) => {
  const {userId} = req.params
  if (Number.isNaN(userId)) return res.sendStatus(400)
  try {
    let room = await Message.findOne({
      where: {
        userId: req.user.id
      }
    })

    if (!room) {
      room = await Room.findAll({
        where: {
          members: {
            [Op.contains]: [2]
          }
        }
      })
    }

    let roomId
    if (!room.dataValues) {
      roomId = 1
    } else {
      roomId = room.dataValues.roomId
    }
    // let roomId = room.dataValues.roomId
    let messages = await Message.findAll({
      where: {
        roomId
      },
      include: [User],
      attributes: ['id', 'message', 'timeStamp']
    })

    messages
      .sort(function(a, b) {
        return a.id - b.id
      })
      .sort(function(a, b) {
        return a.name - b.name
      })

    res.send(messages)
  } catch (err) {
    next(err)
  }
})
