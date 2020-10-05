'use strict'

const db = require('../server/db')
const {User, Message, Room} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'last',
      email: 'cody@email.com',
      password: '123',
      imageUrl:
        'https://avatars1.githubusercontent.com/u/27032995?s=400&u=45fc9d76050a352834fa9e8868d174defaeb6d1c&v=4'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'last',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'koty',
      lastName: 'last',
      email: 'koty@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'billy',
      lastName: 'last',
      email: 'billy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'danny',
      lastName: 'last',
      email: 'danny@email.com',
      password: '123'
    })
  ])

  const messages = await Promise.all([
    Message.create({
      message: 'Hey!!'
    }),
    Message.create({
      message: 'Hello world 2'
    }),
    Message.create({
      message: 'Hello world 3'
    }),
    Message.create({
      message: 'Hello world 4'
    })
    // Message.create({
    //   message: 'Hello world 5',
    // }),
    // Message.create({
    //   message: 'Hello world 6',
    // }),
    // Message.create({
    //   message: 'Hello world 7',
    // }),
    // Message.create({
    //   message: 'Hello world 8',
    // }),
  ])

  const room = await Promise.all([
    Room.create({members: [users[0].id, users[1].id]}),
    Room.create({members: [users[2].id, users[3].id]})
  ])

  await room[0].addUser(users[0])
  await room[0].addUser(users[1])
  await room[1].addUsers(users[2])
  await room[1].addUsers(users[3])
  await users[0].addMessage(messages[0])
  await room[0].addMessage(messages[0])
  await users[2].addMessage(messages[1])
  await room[1].addMessage(messages[1])
  // await users[1].addMessage(messages[1])
  // await room[0].addMessage(messages[1])

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
