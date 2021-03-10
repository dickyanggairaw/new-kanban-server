const { comparedPassword } = require('../helpers/bcrypt');
const { User } = require('../models')
const {createToken, verifyToken} = require('../helpers/jwt')

class UserController{
    static async register(req, res, next){
        try {
            const newUser = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.create(newUser);
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            const {email, password} = req.body

            const user = await User.findOne({
                where: { email }
            })

            if(!user) {
                throw {msg: "Invalid Email or Password"}
            }

            if(!comparedPassword(password, user.password)){
                throw {msg: "Invalid Email or Password"}
            }

            const access_token = createToken(user)

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController