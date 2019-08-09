const router = require('express').Router();
const passport = require('passport');

router.get('', (req, res, next) => {
    res.status(200);
});

router.get('/login', passport.authenticate('local'), (req, res, next) => {
    res.status(200);
});

module.exports = router;