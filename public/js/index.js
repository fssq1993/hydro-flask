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


socket.on('newLocationMessage', function(message) {
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from}:`)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#messages').append(li)
})

const messageTextbox = jQuery('[name=message]')

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    })
})

const locationButton = jQuery('#send-location')
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to find your location.')
    })
})