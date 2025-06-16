require('dotenv').config()

//import express

const express=require('express')
const cors = require('cors')
const routes = require('./routes')
require('./connection')

//create server
const cookpediaServer = express()
cookpediaServer.use(cors())
cookpediaServer.use(express.json())
//json({limit:'10mb'})  incase server cant handle large data
cookpediaServer.use(routes)

const PORT = 4000 || process.env.PORT

cookpediaServer.listen(PORT, ()=>{
    console.log(`server running at port nummber ${PORT}`);
    
})