const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORT || 4000
dotenv.config();

//DB Connection
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false},
    () => { console.log('Connected to DB')
})
app.get('/',(req,res)=>{
    res.send('This is the api for Personal Schedule')
})
//Import routes
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')


//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Route Middleware
app.use('/api/user',authRoute)
app.use('/api/users',usersRoute)


//Initialize server 
app.listen(port,() => {
    console.log('Server on port ' + port)
}) 
