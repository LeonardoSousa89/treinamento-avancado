const db     = require('../db/db')
const method = require('../methods/validation')

const express = require('express')
const server = express.Router()

server.route('/test-communicate').get((req,res)=>{
    db.select('*')
      .table('messagetest')
      .then(message => res.status(200).json(message))
      .catch(err => res.status(500).send(err))
})

server.route('/').get((req,res)=>{
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
             .then(_ => res.status(201).json( ))
             .catch(err => res.status(400).send(err))
})

server.route('/:id').delete((req,res)=>{

}).put((req,res)=>{
    
}).get((req,res)=>{
     const user = {  ...req.params }

      db.where({ id: user.id })
        .select(['girlname','yearofmeet','statusofloved'])
        .table('authdata')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).send(err))
})

module.exports = server