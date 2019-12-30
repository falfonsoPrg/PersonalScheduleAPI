const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const {registerValidation,loginValidation} = require('../validation')

router.post('/register', async (req,res)=>{
    //Validation
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exist in the database')

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a user
    const user = new User({
        user_type: req.body.user_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
        email: req.body.email,
        cellphone: req.body.cellphone
    });
    try {
        //Save a user in the database
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Login
router.post('/login', async (req,res)=>{
    //Validation
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the email exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('The email is not registered in the database')

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    //Create and put a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{
        expiresIn: '1h'
    })
    res.header('auth-token',token).send(token)
})

module.exports = router;