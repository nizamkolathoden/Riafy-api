const express = require('express')
const app = express()
const cors = require('cors')


//reguler middleware
app.use(express.json())
app.use(cors())

const morgan = require("morgan")
app.use(morgan('dev'))
require('dotenv').config()

//DB connection and Port
const DB = require('./config/Db')()
const PORT = process.env.PORT||3000;

app.use('/api/v1/bookmark',require("./router/bookmark"))



// app.get("/",(req,res)=>{
//     console.log(req.protocol);
//     console.log(req.get('host'));

// })

app.listen(PORT,()=>console.log(`Server Running on ${PORT} 🚀 🚀`))