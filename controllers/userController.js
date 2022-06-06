const { User, Project } = require('../models');
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          return res.json(users);
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
        .populate('projects')
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

    //login a user 
    loginUser (req, res) {
      User.findOne({username:req.body.username}).then(dbUser=>{
        if(!dbUser){
          console.log("no user")
            return res.status(403).send("invalid credentials")
        } 
        if (bcrypt.compareSync(req.body.password,dbUser.password)) {
          //creating the token 
            const token = jwt.sign(
              //data to include.  NOTE: jwts are encoded, not encrypted.  Meaning, the can easily be decoded.  Dont put sensitive data in here
              {
                username: dbUser.username,
                id: dbUser.id
              },
              //secret string to verify signature.  should be an env variable for saftey
              process.env.JWT_SECRET,
              //options object, expiresIn says how long the token is valid for.  Takes a string
              {
                expiresIn: "2h"
              }
            );
            res.json({ 
                token: token, 
                user: dbUser
            });
          } else {
            return res.status(403).send("invalid credentials");
          }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"an error occured",err})
    })
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