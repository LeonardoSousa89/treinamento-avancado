const _PORT   = 8081

const server  = require('./api/index')

const express = require('express')
const cors    = require('cors')
const morgan  = require('morgan')

const app     = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin:'*'}))
app.use(express.urlencoded({
    extended:true
}))

app.use('/', server)

app.listen(_PORT)