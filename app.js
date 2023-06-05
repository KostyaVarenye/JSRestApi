const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config();
const connectDB = require('./connect')
const middleware = require('./middleware');
const { Dog } = require("./models.js");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

app.use(express.json());
app.use(middleware); // Adding the middleware function here
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/helloWorld", async (req, res) => {
  return res.json({ message: "Hello, World" });
});

app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
});

app.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(id);
  return res.status(200).json(dog);
});


const uri = process.env.MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);