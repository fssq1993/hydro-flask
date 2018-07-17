const socket = io()
socket.on('connect', function() {
    console.log('Connect to server')

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, that works for me'
    })
})

socket.on('disconnect', function() {
    console.log('Disconnect from the server')
})

socket.on('newMessage', function(message) {
    console.log('New message', message)
})