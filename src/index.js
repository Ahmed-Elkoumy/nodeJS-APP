const mongoose = require ('mongoose');
const express = require('express');
const redis = require ('redis');
const os = require ('os');

//init app
const port = 4000;
const app = express();

//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({
 url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient .on('error', err => console.log('Redis Client Error', err));
redisClient .on('connect', () => console.log('Redis is working ...'));
redisClient.connect();
//redis test
app.get('/data', async (req, res) => {
  const products = await redisClient.get ('products')
  res.send (`<h1> WELCOME TO MY SIMPLE PROJECT </h1> <h2> ${products} </h2>`);
});
app.get('/', (req, res) => {
  redisClient.set('products','products...');
  console.log (`traffic from ${os.hostname}`);
  res.send ('<h1> WELCOME TO MY SIMPLE PROJECT   </h1>');
});
// end of redis test
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




//connect database MongoDB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
 .connect(URI)
 .then(() => {
   return console.log('connect to db...');
 })
 .catch((err)=> {
   return console.log('failed to connect to db:', err);
 });


