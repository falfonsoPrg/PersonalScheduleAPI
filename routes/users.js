const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')
const mongoose = require('mongoose')
const TaskSchema = require('../models/TaskSchema')
const Task = mongoose.model('Task',TaskSchema)
const TagSchema = require('../models/TagSchema')
const Tag = mongoose.model('Tag',TagSchema)

const {taskValidation,tagValidation} = require('../validation')


router.get('/', verify ,async (req,res) => {
    try {
        const data = await User.findOne({_id: req.user})
        res.json(data)
    } catch (error) {
        res.status(400).send('User not found')
    }
})

router.get('/all', verify ,async (req,res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        res.status(400).send('There are not users in the database')
    }
})

router.get('/userId/:id',verify,async(req,res)=>{
    const id = req.params.id
    try {
        const data = await User.findOne({_id: id})
        res.json(data)
    } catch (error) {
        res.status(400).send('User not found')
    }
})

//Create a new task
router.post('/newTask',verify,async(req,res)=>{
    //Validate the data
    const {error} = taskValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try {
        const {tasks} = await User.findOne({_id: req.user})
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            start_date:req.body.start_date,
            end_date:req.body.end_date,
            send_email:req.body.send_email,
            send_cellphone:req.body.send_cellphone,
        })
        tasks.push(task)
        const data = await User.findOneAndUpdate({_id: req.user,'tasks.title':{$ne:req.body.title}},{tasks: tasks},{new:true})
        if(!data) return res.status(400).send('Already exist one task with that name, try again')
        res.json(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Return all the task of the logged user
router.get('/getTask',verify,async(req,res)=>{
    try {
       const {tasks} = await User.findOne({_id: req.user})
       res.send(tasks)
    } catch (error) {
        res.status(400).send('The user does not have any task')
    }
})

//Return a task by id of the logged user
router.get('/taskById/:id',verify,async(req,res)=>{
    const id = req.params.id
    try {
        const {tasks} = await User.findOne({_id: req.user,'tasks._id':id})
        tasks.forEach(task => {
            if(task._id == id) return res.send(task)
        });
        res.status(400).send('Task not found')
    } catch (error) {
        res.status(400).send('Task not found')
    }
})

//Return all the task from the given user id
router.get('/getAllTaskByUserId/:id',verify,async(req,res)=>{
    const id = req.params.id
    try {
        const {tasks} = await User.findOne({_id: id})
        res.send(tasks)
     } catch (error) {
         res.status(400).send('The user does not have any task')
     }
})

//Return a task from the given user id
router.get('/taskByUserId/:userId/:taskId',verify,async(req,res)=>{
    const userId = req.params.userId
    const taskId = req.params.taskId
    try {
        const {tasks} = await User.findOne({_id: userId,'tasks._id':taskId})
        tasks.forEach(task => {
            if(task._id == taskId) return res.send(task)
        });
        res.status(400).send('Task not found')
    } catch (error) {
        res.status(400).send('Task not found')
    }
})

//Create a new Tag
router.post('/newTag/:taskId',verify,async(req,res)=>{
    const taskId = req.params.taskId
    //Validate the data
    const {error} = tagValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try {
        const {tasks} = await User.findOne({_id: req.user})
        var taskAux;
        tasks.forEach(task => {
            if(task._id == taskId){
                taskAux = task
                tasks.splice( tasks.indexOf(task), 1 )
            }
        })
        const tag = new Tag({
            name: req.body.name,
            color: req.body.color
        })

        taskAux.tags.push(tag)

        tasks.push(taskAux)

        const data = await User.findOneAndUpdate({_id: req.user,'tasks.tags.name':{$ne:req.body.name}},{tasks: tasks},{new:true})
        if(!data) return res.status(400).send('Already exist the tag with that name, try again')
        res.json(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;