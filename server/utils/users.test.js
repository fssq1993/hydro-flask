const expect = require('expect')

const {Users} = require ('./users')

describe('Usres', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike1',
            room: 'Node1 Course'
        },{
            id: '2',
            name: 'Mike2',
            room: 'Node2 Course'
        },{
            id: '3',
            name: 'Mike3',
            room: 'Node1 Course'
        }]
    })

    it('should remove a user', () => {
        const userId = '1'
        const user = users.removeUser(userId)
        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(2)
    })

    it('should not remove user', () => {
        const userId = '99'
        const user = users.removeUser(userId)
        expect(user).toBeFalsy()
        expect(users.users.length).toBe(3)

    })

    it('should find user', () => {
        const userId = '2'
        const user = users.getUser(userId)
        
        expect(user.id).toBe(userId)

    })

    it('should not find user', () => {
        const userId = '10'
        const user = users.getUser(userId)
        
        expect(user).toBeFalsy()


    })

    it('should add new user', () => {
        const users = new Users()
        const user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        }
        resUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })

    it('should return names for node course', () => {
        const userList = users.getUserList('Node1 Course');
        expect(userList).toEqual(['Mike1', 'Mike3'])
    })

    it('should return names for node course', () => {
        const userList = users.getUserList('Node2 Course');
        expect(userList).toEqual(['Mike2'])
    })


})