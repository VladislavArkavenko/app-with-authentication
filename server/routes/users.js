const router = require('express').Router();
const auth = require('./auth');

const UserController = require('../controllers/users.controller');

router.post('/create', auth.optional, UserController.create );
router.post('/login', auth.optional, UserController.login );

module.exports = router;
