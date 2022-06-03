const connection = require('../config/connection');
const { User, Project, Image } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

 
  await User.deleteMany({});

  await Project.deleteMany({});

  // await Image.deleteMany({});
  
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

  // const projects = [
  //   {
  //     title: 'testproject1',
  //     username: 'test1'
  //   },
  //   {
  //     title: 'testproject2',
  //     username: 'test2'
  //   },
  //   {
  //     title: 'testproject3',
  //     username: 'test1'
  //   },
  // ]

  await User.collection.insertMany(users);
  // await Project.collection.insertMany(projects)
  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  // console.table(projects)
//   console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});