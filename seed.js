const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// MongoDB URL from the Docker Compose environment variable
const url = 'mongodb://admin:password@mongo:27017';
const dbName = 'movies';
const client = new MongoClient(url);

async function seedDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('movies');

    // Load movie data from seeding.json
    const movies = JSON.parse(fs.readFileSync('seeding.json', 'utf8'));

    // Insert movies into collection
    const result = await collection.insertMany(movies);
    console.log(`${result.insertedCount} movies inserted`);
  } catch (err) {
    console.error('Failed to seed database:', err);
  } finally {
    await client.close();
  }
}

seedDB();
