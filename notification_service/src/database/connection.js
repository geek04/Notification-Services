/**
 * MongoDB connection setup.
 */
const { MongoClient } = require('mongodb');
const config = require('../config/env.js');

// Simply pass the URL, no need for useNewUrlParser or useUnifiedTopology
const client = new MongoClient(config.DB_URL);

let db = null;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(); // Uses the database name from the URL
    console.log('MongoDB connected');
  }
  return db;
}

function getDb() {
  if (!db) throw new Error('Database not connected. Call connect() first.');
  return db;
}

module.exports = { connect, getDb };
