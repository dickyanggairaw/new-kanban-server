const { Task, User } = require('../models')

class TaskController{

    static async fetchTask(req, res, next){        
        try {
            const tasks = await Task.findAll({
                include: User
            });
            const dataTask = tasks.map(el=>{
                return {
                    id: el.id,
                    title: el.title,
                    category: el.category,
                    UserId: el.UserId,
                    User: el.User.email
                }
            })
            res.status(200).json(dataTask)
        } catch (error) {
            next(error)
        }
    }

    static async createTask(req, res, next){
        try {
            const data = {
                title: req.body.title,
                category: req.body.category,
                UserId: req.currentUser.id
            }
            const task = await Task.create(data);
            res.status(201).json({
                id: task.id,
                title: task.title,
                category: task.category,
                UserId: task.UserId
            })
        } catch (error) {
            next(error)
        }
    }

    static async findTask(req, res, next){
        try {
            const task = await Task.findOne({
                where:{
                    id: req.params.id
                }
            })
            res.status(200).json({
                id: task.id,
                title: task.title,
                category: task.category,
                UserId: task.UserId
            })
        } catch (error) {
            next({
                code: 404,
                message: "error not found"
            })
        }
    }

    static async editTask(req, res, next){
        try {
            const data = {
                title: req.body.title,
                category: req.body.category
            }
            const task = await Task.update(data, {
                where:{
                    id: req.params.id
                },
                returning: true
            })
            const dataTask = task[1].map(el=>{
                return {
                    id: el.id,
                    title: el.title,
                    category: el.category,
                    UserId: el.UserId
                }
            })
            res.status(200).json(dataTask)
        } catch (error) {
            next(error)
        }
    }

    static async deleteTask(req, res, next){
        try {
            const deleteTask = await Task.destroy({where:{id: req.params.id}, returning: true})
            res.status(200).json(deleteTask)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = TaskController