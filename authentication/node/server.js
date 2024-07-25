

const express=require('express')
const app=express()
const cors=require('cors')
require('./db/connection')
require("dotenv").config()



const userAuth=require("./Routes/userRoute")



const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
// app.use(express.urlencoded({extended:true}))

app.use("/api/auth",userAuth)



const port=4001;

app.listen(port,()=>console.log(`servrer is running at ${port}`))


