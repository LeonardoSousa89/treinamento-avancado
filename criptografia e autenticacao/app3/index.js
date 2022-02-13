const _PORT = 8081

const server = require('./api/route')

const morgan  = require('morgan')
const express = require('express')
const cors    = require('cors')

const app = express()

app.use(express.urlencoded({
    extended:true
}))
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', server)

app.listen(_PORT,()=>{
    console.log(`ONLINE INTO PORT: ${_PORT}`)
})