/* NodeJS Backend */
const { log } = console
const cors = require('cors')
const express = require('express')
const search = require('./routes/search')

require('dotenv').config()
const { PORT } = process.env

const app = express()
app.use(cors())
app.use(express.json())
app.use('/search', search)

app.get('/', async (req, res) => {
    log('GET /')
    res.statusCode = 200
    res.setHeader('content-type', 'text/html')
    return res.send(`<tt>RenDemo Server</tt>`)
})

app.use((error, req, res, next) => {
    log(`ERROR: ${req.method} ${req.url}`, error)
    res.statusCode = 500
    res.setHeader('content-type', 'application/json')
    return res.send({ error })
})

app.listen(PORT, () => {
    console.clear()
    log(`RenDemo: Server started on port ${PORT}`)
})