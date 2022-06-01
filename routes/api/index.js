const router = require('express').Router();
const userRoutes = require('./userRoute');

router.use('/users', userRoutes);


module.exports = router;