const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser)

// api/users/login
router.route('/login').post(loginUser)

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;