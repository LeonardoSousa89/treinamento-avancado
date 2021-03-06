const db     = require('../db/db')
const method = require('../methods/validation')

const bcrypt = require('bcrypt')
const express = require('express')
const server = express.Router()

server.route('/test-communicate').get((req,res)=>{
    db.select('*')
      .table('messagetest')
      .then(message => res.status(200).json(message))
      .catch(err => res.status(500).send(err))
})

server.route('/signup').post((req,res)=>{
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

//estou aqui!
// método gerando erros!
server.route('/login').post((req,res)=>{

    if(!req.body.email || !req.body.pass) return res.status(400).send('Informe usuário e senha!')

    const searchedUser = db.table('authtest')
                           .where({ email: req.body.email })
                           .first()

    if(!searchedUser) return res.status(400).send('Usuário não encontrado!')

    const findUser = bcrypt.compareSync(req.body.pass, searchedUser.pass)
    if(!findUser)  return res.status(404).send('Usuário e senha inválidos!')

    return res.send(200).send('Usuário logado com sucesso!   ;)')
})

server.route('/girlfriend').get((req,res)=>{
    db.select('*')
      .table('authdata')
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).send(err))
}).post((req,res)=>{
    const user = {  ...req.body  }

    try{
        method(user.girlname, 'Nome não informado!')
        method(user.yearofmeet, 'Ano não informado!')
        method(user.statusofloved, 'Status não informado!')
    }catch(err){
        return res.status(400).send(err)
    }

    return db.insert(user)
             .table('authdata')
             .then(_ => res.status(201).json())
             .catch(err => res.status(400).send(err))
})

server.route('/girlfriend/:id').delete((req,res)=>{
    const userId = { ...req.params }

    return db.where({id: userId.id})
            .delete()
            .table('authdata')
            .then(_ => res.status(204).json())
            .catch(err => res.status(404).send(err))
}).put((req,res)=>{
    const user   = {  ...req.body  }
    const userId = { ...req.params }

    try{
        method(user.girlname, 'Nome não informado!')
        method(user.yearofmeet, 'Ano não informado!')
        method(user.statusofloved, 'Status não informado!')
    }catch(err){
        return res.status(400).send(err)
    }

    return db.where({id: userId.id})
             .update(user)
             .table('authdata')
             .then(_ => res.status(202).json())
             .catch(err => res.status(404).send(err))
}).get((req,res)=>{
    const userId = { ...req.params }

      db.where({ id: userId.id })
        .select(['girlname','yearofmeet','statusofloved'])
        .table('authdata')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).send(err))
})

module.exports = server