const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const comment = client.db('friends-media').collection('comment')
        const userComent = client.db('friends-media').collection('comment')
        const userInformation = client.db('friends-media').collection('user-information')

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

        })

        app.post('/comment', async (req, res) => {
            const Postcomment = req.body;
            const result = await comment.insertOne(Postcomment)
            res.send(result)
        })
        app.get('/comment', async (req, res) => {
            const comment = req.query.id;
            const query = { post_id: comment }
            const result = await userComent.find(query).toArray()
            res.send(result)
        })

        app.post('/user-information', async (req, res) => {
            const info = req.body;
            const result = await userInformation.insertOne(info)
            res.send(result)
        })
        app.get('/information', async (req, res) => {
            const email = req.query.email;
            const query = { user_email: email }
            const result = await userInformation.findOne(query)
            res.send(result)

        })
        app.get('/information', async (req, res) => {
            const email = req.query.email;
            const query = { user_email: email }
            const result = await userInformation.findOne(query)
            res.send(result)

        })
        app.get('/update-info/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await userInformation.findOne(query);

            res.send(result)
        })
        app.put('/update-info/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) };
            const user = req.body;
            const option = { upsert: true }
            const updatefeild = {
                $set: {
                    name: user.name,
                    address: user.address,
                    email: user.email,
                    university: user.university
                }
            }
            const result = await userInformation.updateOne(query, updatefeild, option)
            res.send(result)
         


        })

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