const db     = require('../db/db')
const method = require('../methods/validation')

const bcrypt = require('bcrypt')
const express = require('express')

const server = express.Router()

server.route('/signup').post((req, res)=>{
    const user = {  ...req.body  }

    const cryptograph = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    try{
        method(user.username, 'Nome de usuário não informado!')
        method(user.email, 'Email não informado!')
        method(user.pass, 'senha não informada!')
    }catch(err){
        return res.status(500).send(err)
    }

    user.pass = cryptograph(user.pass)

    db.insert(user)
      .table('authtest')
      .then(_ => res.status(201).json())
      .catch(err => res.status(400).send(err))
})

server.route('/search').post(async(req, res)=>{
    const user = {  ...req.body  }

    if(!user.email || !user.pass) return res.status(400)
                                            .send('Email e senha não informados!')

    const searchUser = await db.where({ email: user.email })
                               .table('authtest')
                               .first()

    if(!searchUser) return res.status(401).send('Usuário não encontrado!')

    if(searchUser) return db.select(['username', 'email'])
                            .where({ email: user.email })
                            .table('authtest')
                            .then(user => res.status(200).json(user))
                            .catch(err => res.status(500).send(err))
})

module.exports = server