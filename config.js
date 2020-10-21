const 
    dbUser = 'new-user5',
    dbPassword = '12345'

const URI =  `mongodb+srv://${dbUser}:${dbPassword}@crud.i7aza.mongodb.net/food?retryWrites=true&w=majority`

module.exports = URI