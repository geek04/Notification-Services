const { getDb } = require('../../src/database/connection.js');

async function runMigration() {
  const db = getDb();
  // Create indexes for efficient queries
  await db.collection('notifications').createIndex({ userId: 1 });
  await db.collection('notifications').createIndex({ createdAt: 1 });
  console.log('Indexes created!');
  process.exit(0);
}

runMigration().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
