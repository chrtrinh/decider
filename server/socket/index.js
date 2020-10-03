module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('test', user => {
      io.emit('refresh', user)
    })

    socket.on('changes', obj => {
      socket.broadcast.emit('testing')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
