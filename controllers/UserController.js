const { comparedPassword } = require('../helpers/bcrypt');
const { User } = require('../models')
const {createToken, verifyToken} = require('../helpers/jwt')
const { OAuth2Client } = require("google-auth-library");

class UserController{

    static async googleOauth(req, res, next){
        try {
            const id_token = req.body.id_token;
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
              idToken: id_token,
              audience: process.env.CLIENT_ID,
            });
            const { email } = ticket.getPayload();
      
            const user = await User.findOrCreate({
              where: {
                email,
              },
              defaults: {
                email,
                password: `${Math.floor(Math.random() * 1e6)}`,
              },
            });
            
            console.log(user[0].email)
            const token = createToken(user[0]);
            console.log(token)
            res.status(200).json({ access_token: token });
          } catch (err) {
            next({
              data: err,
            });
          }
    }

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
            // res.send(error)
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
            }else if(!comparedPassword(password, user.password)){
                throw {msg: "Invalid Email or Password"}
            }else{
                const access_token = createToken(user)
                res.status(200).json({access_token})
            }                       
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController