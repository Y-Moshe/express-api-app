const router = require('express').Router();
const passport = require('passport');

const usersController = require('../controllers/users');

router.get('', passport.authenticate('local'), usersController.getUsers);

router.post('', usersController.createUser);

router.post('/login', passport.authenticate('local'), usersController.loginUser);

router.post('/logout', passport.authenticate('local'), usersController.logoutUser);

module.exports = router;