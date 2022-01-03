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

app.post('/users',async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { 
                    name: req.body.name, 
                    password: hashedPassword 
                }
        users.push(user)
        res.status(201).send('usuário criado com sucesso!')
    }catch(msg){
        res.status(500).send(msg)
    }
})

app.listen(_PORT,()=>{
    console.log(`_ONLINE INTO PORT:${_PORT}`)
})