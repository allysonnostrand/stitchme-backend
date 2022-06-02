const router = require('express').Router();
const {
  getProjects,
  createProject,
  getSingleProject,
  updateProject,
  addImage,
  addTodo,
  addStep
} = require('../../controllers/projectController');

// /api/projects
router.route('/').get(getProjects).post(createProject);

// /api/thoughts/:thoughtId
router.route('/:projectId').get(getSingleProject).put(updateProject);

// // /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions').post(addReaction)

// // /api/thoughts/:thoughtId/reactions/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;