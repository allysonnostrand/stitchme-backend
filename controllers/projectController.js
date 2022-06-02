const { User, Project, Image, Todo, Step } = require('../models');

module.exports = {

    // Get all projects
    getProjects(req, res) {
      Project.find()
        .then(async (projects) => {
          const projectObj = {
            projects
          };
          return res.json(projectObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // Get a single project
    getSingleProject(req, res) {
      Project.findOne({ _id: req.params.projectId })
        .select('-__v')
        .then(async (project) =>
          !project
            ? res.status(404).json({ message: 'No project with that ID' })
            : res.json({
                project
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // create a new project
    createProject(req, res) {
        Project.create(req.body)
          .then((project) => {
            return User.findOneAndUpdate(
              { username: req.body.username },
              { $addToSet: { projects: project._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'project created, but found no user with that ID',
                })
              : res.json('Created the project 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // Delete a project and remove their projects
    deleteProject(req, res) {
      Project.findOneAndRemove({ _id: req.params.projectId })
        .then((project) =>
          !project
            ? res.status(404).json({
                message: 'project deleted',
              })
            : res.json({ message: 'project successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // update a project
    updateProject(req, res) {
      console.log('You are updating a project');
      console.log(req.body);
      Project.findOneAndUpdate(
        { _id: req.params.projectId },
        { $set: req.body},
        { new: true }
      )
        .then((project) =>
          !project
            ? res.status(404).json({ message: 'No project found with that ID :(' })
            : res.json(project)
        )
        .catch((err) => res.status(500).json(err));
    },

    //add a image
    addImage(req, res) {
      console.log('You are adding a image');
      console.log(req.body);
      Project.findOneAndUpdate(
        { _id: req.params.projectId },
        { $addToSet: { images: req.body } },
        { runValidators: true, new: true }
      )
        .then((image) =>
          !image
            ? res
                .status(404)
                .json({ message: 'No image found with that ID :(' })
            : res.json(image)
        )
        .catch((err) => res.status(500).json(err));
    },

    
    //add a todo
    addTodo(req, res) {
        console.log('You are adding a todo');
        console.log(req.body);
        Project.findOneAndUpdate(
          { _id: req.params.projectId },
          { $addToSet: { todos: req.body } },
          { runValidators: true, new: true }
        )
          .then((todo) =>
            !todo
              ? res
                  .status(404)
                  .json({ message: 'No todo found with that ID :(' })
              : res.json(todo)
          )
          .catch((err) => res.status(500).json(err));
      },

      
    //add a step
    addStep(req, res) {
        console.log('You are adding a step');
        console.log(req.body);
        Project.findOneAndUpdate(
          { _id: req.params.projectId },
          { $addToSet: { steps: req.body } },
          { runValidators: true, new: true }
        )
          .then((step) =>
            !step
              ? res
                  .status(404)
                  .json({ message: 'No step found with that ID :(' })
              : res.json(step)
          )
          .catch((err) => res.status(500).json(err));
      },
   
}
