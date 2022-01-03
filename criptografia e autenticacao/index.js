const _PORT = 3000

const bcrypt  = require('bcrypt')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = []

app.get('/users',(req,res)=>{
    return res.status(200).json(users)
})

app.post('/users',(req,res)=>{
    
})

app.listen(_PORT,()=>{
    console.log(`_ONLINE INTO PORT:${_PORT}`)
})