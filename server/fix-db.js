const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  await db.collection('blogs').updateMany(
    { isPinned: { $exists: false } },
    { $set: { isPinned: false } }
  );
  await db.collection('blogs').updateMany(
    { isPinned: null },
    { $set: { isPinned: false } }
  );
  console.log('Fixed DB directly with raw driver');
  process.exit(0);
});
