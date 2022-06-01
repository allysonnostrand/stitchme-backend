const Project = require('../../models/Project');
const { User, Project } = require('../models');

module.exports = {

    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const userObj = {
            users,
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // Get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Delete a user and remove their projects
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Project.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .then((project) =>
          !project
            ? res.status(404).json({
                message: 'User deleted, but no projects found',
              })
            : res.json({ message: 'User successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // update a user
    updateUser(req, res) {
      console.log('You are updating a user');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body},
        { new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

}