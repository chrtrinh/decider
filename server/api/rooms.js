const router = require('express').Router()
const {Room} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll()
    res.json(rooms)
  } catch (err) {
    next(err)
  }
})

// router.get('/:userId', async (req, res, next) => {
//   const {userId} = req.params
//   if (Number.isNaN(userId)) return res.sendStatus(400)
//   try {
//     const users = await User.findByPk(userId, {
//       include: ['chat'],
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
