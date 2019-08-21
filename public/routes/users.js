const router = require('express').Router();
const passport = require('passport');

const usersController = require('../controllers/users');

router.get('/:id/profile', passport.authenticate('jwt', {session: false}), usersController.getProfile);

router.post('', passport.authenticate('!jwt', {session: false}), usersController.createUser);

router.post('/login', passport.authenticate('!jwt', {session: false}), usersController.loginUser);

router.get('/logout', passport.authenticate('jwt', {session: false}), usersController.logoutUser);

module.exports = router;