const router = require('express').Router();
const userController = require('./user.controller');
const auth = require('./../../middlewares/authenticate');

router.route('/signup')
    .post(userController.signup)
router.route('/signin')
    .post(userController.signin)
router.route('/:id')
    .get(userController.profile)
    .patch(auth, userController.patch)
    .put(auth, userController.put)

module.exports = router;