const _port = 3000

const route = require('./config/route')

const morgan = require('morgan')
const express = require('express')
const app     = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',route)

app.listen(_port)