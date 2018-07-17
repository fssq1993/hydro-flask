const expect = require('expect')

const {
    generateMessage,
    generateLocationMessage
} = require('./message')

describe('geenrateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jen'
        const text = 'Some message'
        const message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({from,text})
    })
})


describe('generateLocationMessage', () => {
    it('should generate correct localtion object', () => {
        const from = 'Jen'
        const latitude = 15
        const longitude = 19
        const url = 'https://www.google.com/maps?q=15,19'

        const location = generateLocationMessage(from, latitude, longitude)

        expect(typeof location.createdAt).toBe('number')
        expect(location).toMatchObject({from, url})


    })
})