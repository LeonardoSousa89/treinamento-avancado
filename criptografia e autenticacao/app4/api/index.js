const db = require('../methods/index')

const bcrypt  = require('bcrypt')
const express = require('express')

const server  = express.Router()

/**get user */
server.route('/').get((req,res)=>{

    var DB = db.db
    return res.status(200).json(DB)

})

/**creation of account */
server.route('/create-account').post((req,res)=>{

    const user = { ...req.body }

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }
    
    try{
        db.validate(user.id, 'Id not inserted.')
        db.validate(user.name, 'name not inserted.')
        db.validate(user.email, 'email not inserted.')
        db.validate(user.password, 'password not inserted.')
    }catch(err){
        return res.status(400).send(err)
    }

    const account = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    }

    account.password = encryptPassword(account.password)

    db.method('insert',account)

    return res.status(201).send('Data inserted with success.')

})

/**get user of account by email */
server.route('/get-by-email').get((req,res)=>{

    var DB = db.db
    let user = { ...req.body }

    const find = DB.find(e =>{
            if(e.email === user.email ) return e
        })
    
    if(!find) return res.status(400).send('User not found.')

    return res.status(200).json(find)

})

/**removing user of account by id */
server.route('/delete/:id').delete((req,res)=>{

    var DB = db.db
    let user = { ...req.params }

    const deletById = DB.findIndex(find => find.id === user.id)
      
    if(deletById < 0) return res.status(404).json({msg:'User not found!'})

    DB.splice(deletById,1)
    
    return res.status(204).send()

})

module.exports = server