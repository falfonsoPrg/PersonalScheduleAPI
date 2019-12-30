const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')


router.get('/', verify ,async (req,res) => {
    const data = await User.findOne({_id: req.user})
    res.json(data)
})

module.exports = router;