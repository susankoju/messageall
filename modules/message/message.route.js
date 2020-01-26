const router = require('express').Router();
const messageController = require('./message.controller');

router.route('/send')
    .post(messageController.send)
router.route('/delete/:id')
    .delete(messageController.delete)
router.route('/')
    .get(messageController.receive)

module.exports = router;