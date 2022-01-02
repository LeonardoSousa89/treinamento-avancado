const validation = require('../config/validation')

const db     = require('../db/db')
const bcrypt = require('bcrypt')
const express = require('express')
const route   = express.Router()

route.route('/users').get((req, res)=>{
                 db.select('id','username','email')
                   .table('users')
                   .then(user => res.status(200).json(user))
                   .catch(err => res.status(500).json(err))
}).post((req, res)=>{
    const { existsOrError } = validation

    const encryptPassword = pass => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(pass,salt)
    }

        const user = {...req.body}

        try{
            existsOrError(user.username, 'Nome de usuário não informado.')
            existsOrError(user.email, 'Email não informado.')
            existsOrError(user.pass, 'Senha não informada.')
        }catch(msg){
            return res.status(500).json(msg)
        }

            user.pass = encryptPassword(user.pass)
        
            db.insert(user) 
                .table('users')
                .then(_=> res.status(204).json('Usuário salvo com Sucesso!'))
                .catch(err => res.status(400).json(err))
})

module.exports = route

