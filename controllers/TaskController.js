const { Task, User } = require('../models')

class TaskController{

    static async fetchTask(req, res, next){        
        try {
            const tasks = await Task.findAll();
            res.status(200).json(tasks)
        } catch (error) {
            next(error)
        }
    }

    static async createTask(req, res, next){
        try {
            const data = {
                title: req.body.title,
                UserId: req.currentUser.id
            }
            console.log(data)
            const task = await Task.create(data);
            res.status(201).json({
                title: task.title,
                category: task.category,
                UserId: task.UserId
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTask(req, res, next){
        try {
            const deleteTask = await Task.destroy({where:{id: req.params.id}, returning: true})
            res.status(200).json(deleteTask)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController