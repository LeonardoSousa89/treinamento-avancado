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
        res.status(201).send('Usuário criado com sucesso.')
    }catch(msg){
        res.status(500).send(msg)
    }
})

app.post('/users/login', async(req, res)=>{
    const user = users.find(user => user.name === req.body.name)
    if(user === null) {
        res.status(400).send('Usuário não encontrado.')
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send(`Seja bem vindo ${user.name}!`)
        }else{
            res.send(`Usuário não autorizado.`)
        }
    }catch(msg){
        res.status(500).send(msg)
    }
})

app.listen(_PORT,()=>{
    console.log(`_ONLINE INTO PORT:${_PORT}`)
})