const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const e = require('express');
const app = express()
const port = 5000
require('dotenv').config()
// middleware
app.use(cors())
app.use(express.json())


const run = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wahhk.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        const all_post = client.db('friends-media').collection('all-user-post');
        const get_all_post = client.db('friends-media').collection('all-user-post');
        const userlist = client.db('friends-media').collection('user-list');

        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await all_post.insertOne(post)
            res.send(result)
        })

        app.get('/post', async (req, res) => {
            const post_query = {};
            const result = await get_all_post.find(post_query).toArray();
            res.send(result)
        })

        app.post('/all-user', async (req, res) => {
            const user = req.body;
            const result = await userlist.insertOne(user)
            res.send(result)
        })

        app.get('/all-user', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            console.log(email)
            const result = await userlist.find(query).toArray()
            res.send(result)
            console.log(result)
        })

        // user post query by email



    }
    finally {

    }
}
run().catch(console.error())








app.get('/', (req, res) => {
    res.send('friends-media server is running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// sccial-media
// GBUB5tcckGhya5vp