const bcrypt = require('bcryptjs')

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparedPassword(password, serverPassword){
    return bcrypt.compareSync(password, serverPassword)
}

module.exports = {
    hashPassword,
    comparedPassword
}