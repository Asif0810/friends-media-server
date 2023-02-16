const express = require('express');
const cors = require('cors')
const app = express()
const port = 5000
require('dotenv').config()
// middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('friends-media server is running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// sccial-media
// GBUB5tcckGhya5vp