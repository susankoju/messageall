const dashboardRoute = require('./../modules/dashboard/dashboard.route');
const userRoute = require('./../modules/user/user.route');
const messageRoute = require('./../modules/message/message.route');
const authenticate = require('./../middlewares/authenticate');


const express = require("express");
const router = express.Router();

router.use('/user', userRoute);
router.use('/message', authenticate, messageRoute);
router.use('/', dashboardRoute);

module.exports = router;