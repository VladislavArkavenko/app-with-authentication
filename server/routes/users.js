const router = require('express').Router();
const auth = require('./auth');

const UserController = require('../controllers/users.controller');

router.post('/',       auth.optional, UserController.create );
router.post('/login',  auth.optional, UserController.login );
router.get('/current', auth.required, UserController.get );

module.exports = router;
