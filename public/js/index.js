const socket = io()
socket.on('connect', function() {
    console.log('Connect to server')
})

socket.on('disconnect', function() {
    console.log('Disconnect from the server')
})

socket.on('newMessage', function(message) {
    console.log('New message', message)
    const li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li)
})

socket.on('createMessage', function(message) {
    console.log('Create message', message)
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    })

})