const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/users');

/**
 * Protected valid token:
 *     A valid token must be sent via HTTP Authorization Header!
 *     In other words, user must be logged in.
 * 
 * Protected invalid token:
 *     Any request with a valid token will be rejected!
 *     In other words user must be logged out.
 */


/**
 * Sign-Up route.
 * POST: /api/users (Protected invalid token)
 */
router.post('',
    passport.authenticate('!jwt', { session: false }),
    controller.createUser
);

/**
 * Log-In route.
 * POST: /api/users/login (Protected invalid token)
 */
router.post('/login',
    passport.authenticate('!jwt', { session: false }),
    controller.loginUser
);

/**
 * User Profile route.
 * GET: /api/users/:id/profile (Protected valid token)
 */
router.get('/:id/profile',
    passport.authenticate('jwt', { session: false }),
    controller.getProfile
);

/**
 * Log-out route.
 * GET: /api/users/:id/profile (Protected valid token)
 */
router.get('/logout',
    passport.authenticate('jwt', { session: false }),
    controller.logoutUser
);

module.exports = router;