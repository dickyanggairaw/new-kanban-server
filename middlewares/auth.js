const UserController = require('../controllers/UserController')
const {verifyToken} = require('../helpers/jwt')
const {User, Task} = require('../models')

function authentic(req, res, next){
    try {
        const user = verifyToken(req.headers.access_token)

        User.findOne({
            where: {
                email: user.email
            }
        })
            .then(()=>{
                req.currentUser = user
                next()
            })
            .catch(err => {
                throw new Error()
            })
    } catch (error) {
        next(error)
    }
}

function authorize(req, res, next){
    Task.findOne({
        where:{
            id: req.params.id
        }
    })
        .then(data=>{
            if(data.UserId == req.currentUser.id){
                next()
            }else{
                next({
                    code:404,
                    msg: "data not found"
                })
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = {authentic, authorize}