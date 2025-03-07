const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 8080;
const url = process.env.TOKEN_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db("test");
        const newData = {
            name: req.body.name,
            age: req.body.age,
            grade: req.body.grade,
            city: req.body.city,
            country: req.body.country,
            born: req.body.born,
            class: 'member'
        };
        await dbo.collection("test_db").insertOne(newData);
        client.close();
        res.redirect('/');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send(err.toString());
    }
});

app.get('/data', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db("test");
        const data = await dbo.collection("test_db").find({}).toArray();
        console.log("-------------------------------------------");
        console.log('Data fetched:', data);
        res.json(data);
        client.close();
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send(err.toString());
    }
});

app.get('/search', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db("test");
        const searchQuery = req.query.query;
        const query = searchQuery ? {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { city: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } },
                { age: { $regex: searchQuery, $options: 'i' } },
                { grade: { $regex: searchQuery, $options: 'i' } },
                { born: { $regex: searchQuery, $options: 'i' } },
                { class: { $regex: searchQuery, $options: 'i' } },
                { _id: ObjectId.isValid(searchQuery) ? new ObjectId(searchQuery) : null }
            ]
        } : {};
        const data = await dbo.collection("test_db").find(query).toArray();
        console.log("-------------------------------------------");
        console.log('Search results:', data);
        res.json(data);
        client.close();
    } catch (err) {
        console.error('Error searching data:', err);
        res.status(500).send(err.toString());
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db("test");
        const id = req.params.id;
        const updatedData = {
            name: req.body.name,
            age: req.body.age,
            grade: req.body.grade,
            city: req.body.city,
            country: req.body.country,
            born: req.body.born,
            class: req.body.class
        };
        await dbo.collection("test_db").updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        client.close();
        res.sendStatus(200);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).send(err.toString());
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db("test");
        const id = req.params.id;
        await dbo.collection("test_db").deleteOne({ _id: new ObjectId(id) });
        client.close();
        res.sendStatus(200);
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).send(err.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});