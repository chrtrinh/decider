const User = require('./user')
const Message = require('./message')
const Room = require('./room')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Room.belongsToMany(User, {through: 'chats'})
User.belongsToMany(Room, {through: 'chats', as: 'chat'})

Message.belongsTo(User)
User.hasMany(Message)

Room.hasMany(Message)
Message.belongsTo(Room)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Message,
  Room
}
