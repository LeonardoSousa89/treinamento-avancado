const _port   = 3000

const server  = require('./server') 

const express = require('express')
const cors    = require('cors')
const morgan  = require('morgan') 

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended:true}))

app.use('/',server)

app.listen(_port)
 