const bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      passport = require('passport');

const User = require('../models/user');

exports.getProfile = (req, res) => {
    User.findOne({_id: req.user._id}).then(user => {
        if (!user) {
            return res.status(204).json({
                message: 'Sorry, No-Content, contact the support for more info!'
            });
        }

        res.status(200).json({
            user: user
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: process.env.UNKNOWN_ERROR_MSG
        });
    });
};

exports.createUser = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    user.save().then(user => {
        res.status(201).json({
            message: 'Your account has been created!'
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: process.env.UNKNOWN_ERROR_MSG
        });
    });
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error) {
            return res.status(500).json({error});
        }

        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        }

        req.login(user, {session: false}, err => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign({user: user}, process.env.JWT_SECRET, {expiresIn: 60}); // expiresIn seconds
            return res.json({
                message: 'You are successfully connected!',
                user,
                token
            });
        });
    })(req, res);
};

exports.logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({
        message: "You have successfully logged out!"
    });
};
