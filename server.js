const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const client = new MongoClient('mongodb://localhost:27017')

app.use(express.static("build"))
app.use(express.json())

app.post('/api/sweets', async (req, res) => {
    await client.connect()
    const collection = client.db('sweets').collection('boiled')
    await collection.insertOne(req.body)
    await client.close()
    res.sendStatus(201)
})

app.get('/api/sweets', async (req, res) => {
    await client.connect()
    const collection = client.db('sweets').collection('boiled')
    const sweets = await collection.find({}).toArray()
    res.send(sweets)
    await client.close()
})

app.listen(3001, () => {
    console.log("MERN stack on 3001")
})