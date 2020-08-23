//create the express app with express.js
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000


app.use('/static/', express.static('public'))
app.get('/', (req, res)=> {

    res.sendFile(path.join(__dirname + '/index.html'))
    
})
app.listen(port)