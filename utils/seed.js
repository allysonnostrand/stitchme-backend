const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

 
  await User.deleteMany({});

//   await Project.deleteMany({});

  const users = [
      {
          username: 'test1',
          password: 'password'
      },
      {
          username: 'test2',
          password: 'password'
      },
      {
          username: 'test3',
          password: 'password'
      }
  ];

  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
//   console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});