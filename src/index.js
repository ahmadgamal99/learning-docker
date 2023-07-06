const redis= require('redis');
const pg= require('pg');
const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 3500;
const app = express();
const env = process.env;
const redisUri = `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`;
const dbUri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}`;
// const pgUri = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}`;

mongoose.connect(dbUri).then( () => console.log('Database connected successfully !')).catch(err => console.log(err));

// redis

const redisClient = redis.createClient({
    url: redisUri
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected successfully'));
redisClient.connect();

// redis


// postgresql
// const pgClient = new pg.Client({
//     connectionString: pgUri
// })

// pgClient.connect().then( () => console.log('PG Database connected successfully !')).catch(err => console.log(err));
// postgresql

app.get('/', (req, res) => {
    redisClient.set('products','products...');
    res.send("<h1>Hello, jimmy</h1>");
})

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h1>Hello, jimmy</h1> <h2>${products}</h2>`);
})

app.listen(PORT, () => console.log(`App is up and running on port : ${PORT}`));