const socket = io()

function scrollToBottom() {
    
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child')

    const clientHeight = messages.prop('clientHeight')
    const scrollTop = messages.prop('scrollTop')
    const scrollHeight = messages.prop('scrollHeight')
    const newMessageHeight = newMessage.innerHeight()
    const lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function() {
    const params = jQuery.deparam(window.location.search)
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('No error')
        }
    })
})

socket.on('disconnect', function() {
    console.log('Disconnect from the server')
})

socket.on('updateUserList', function(users) {
    const ol = jQuery('<ol></ol>')
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#users').html(ol)
})

socket.on('newMessage', function(isRobot, message) {
    const formattedTime = moment(message.createdAt).format('h:mm a')
    let template = jQuery('#message-template').html()
    if(isRobot) {
        template = jQuery('#message-robot-template').html()
    }
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()
})

socket.on('createMessage', function(message) {
    console.log('Create message', message)
})


socket.on('newLocationMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a')

    const template = jQuery('#location-message-template').html()
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()
})

const messageTextbox = jQuery('[name=message]')

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()
    socket.emit('createMessage', {
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