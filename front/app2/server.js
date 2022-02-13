const express = require('express')
const server  = express.Router()

server.route('/').get((req,res)=>{
    return res.sendFile(__dirname + '/index.html')
})

server.route('/app').get((req,res)=>{
     res.sendFile(__dirname + '/app.html')
})

module.exports = server