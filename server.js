const express=require('express')
const app=express()
const dotenv=require('dotenv')
const path=require("path")
dotenv.config({path:"config.env"})
const morgan = require("morgan")
const connectDB=require('./server/database/connection');

connectDB()
//log requests
app.use(morgan("tiny"))
const bodyParser=require('body-parser')

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view Engine
app.set("view engine","ejs")

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))


const PORT=process.env.PORT||8080

app.use('/',require('./server/routes/routes'))






app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})