const express = require('express');
const axios = require('axios');
const redis = require('redis');
const cors = require('cors');
const app = express();

const PORT = 3001;

app.use(cors());
// Create Redis client
let redisClient;

async function connectRedis() {
  // Create a Redis client
  redisClient = redis.createClient({
    url: 'redis://localhost:6379' // Connect to Redis server running on localhost
  });

  // Log a message when connected to Redis
  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });

  // Log any errors that occur with Redis
  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });

  await redisClient.connect(); // Connect to Redis when the app starts
}

connectRedis(); // Call the connectRedis function to establish a connection to Redis

// Middleware to check cache
async function cache(req, res, next) {
  const cacheKey = 'data';
  
  try {
    const data = await redisClient.get(cacheKey);
    if (data) {
      res.json(JSON.parse(data)); // Return cached data if available
    } else {
      next(); // Continue to the next middleware if data is not cached
    }
  } catch (err) {
    console.error('Redis GET error:', err);
    next();
  }
}

// Routes...

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Route to get data from JSONPlaceholder without cache
app.get('/data', async (req, res) => {
  try {
    const start = Date.now();
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;
    const duration = Date.now() - start;

    console.log(`Data fetched without cache in ${duration}ms`);
    res.json({ data, duration });
  } catch (error) {
    console.error('Error fetching data from JSONPlaceholder:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from JSONPlaceholder' });
  }
});

// Route to get data from JSONPlaceholder with cache
app.get('/data-cached', cache, async (req, res) => {
  try {
    const start = Date.now();
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;
    const duration = Date.now() - start;

    // Save data to Redis with a time-to-live (TTL) of 1 hour (3600 seconds)
    await redisClient.setex('data', 3600, JSON.stringify(data));
    
    console.log(`Data fetched with cache in ${duration}ms`);
    res.json({ data, duration });
  } catch (error) {
    console.error('Error fetching data from JSONPlaceholder:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from JSONPlaceholder' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
