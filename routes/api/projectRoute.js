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

// /api/projects/:projectId
router.route('/:projectId').get(getSingleProject).put(updateProject);

// /api/projects/:projectId/images
router.route('/:projectId/images').post(addImage)

// /api/projects/:projectId/images
router.route('/:projectId/todos').post(addTodo)

// /api/projects/:projectId/images
router.route('/:projectId/steps').post(addStep)

// // /api/projects/:projectId/reactions/:reactionId
// router.route('/:projectId/reactions/:reactionId').delete(removeReaction);

module.exports = router;