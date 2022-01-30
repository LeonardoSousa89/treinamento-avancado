const db = require('../methods/index')

const bcrypt  = require('bcrypt')
const express = require('express')

const server  = express.Router()

server.route('/').get((req,res)=>{

    var DB = db.db
    return res.status(200).send(DB)

})

server.route('/create-account').post((req,res)=>{

    const user = { ...req.body }

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }
    
    const account = {
        name: user.name,
        email: user.email,
        password: user.password
    }

    account.password = encryptPassword(account.password)

    var DB = db.method('insert',account)

    return res.status(201).send('Data inserted with success.')
                          .catch(err => res.status(400).send(err))

})

server.route('/get-by-email').get((req,res)=>{
    var DB = db.db
    let user = { ...req.body }

    const find = DB.find(e =>{
            if(e.email === user.email ) return e
        })
    
    if(!find) return res.status(400).send('User not found.')

    return res.status(200).json(find).catch(err => {
        return res.status(500).send(err)
    })
})

module.exports = server