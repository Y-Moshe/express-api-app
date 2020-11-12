const bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      passport = require('passport');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    user.save().then(() => {
        res.status(201).json({
            message: 'Your account has been created!'
        });
    }).catch(error => next( error ));
};

exports.loginUser = (req, res, next) => {
    console.log('reach login route');
    passport.authenticate('local', { session: false }, (error, user, info) => {
        // Any error case that can occur.
        if (error) {
            return res.status(500).json({ error });
        }

        // Password or email are incorrect!
        if (!user) {
            return res.status(401).json( info );
        }

        req.login(user, { session: false }, err => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 60 }); // expiresIn seconds
            return res.json({
                message: 'You are successfully connected!',
                user,
                token
            });
        });
    })(req, res);
};

exports.getProfile = (req, res, next) => {
    console.log(req.params);
    User.findOne({ _id: req.params.id }).then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'User not found, try to re-login.'
            });
        }

        res.status(200).json({
            user: user
        });
    }).catch(error => next( error ));
};

exports.logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({
        message: "You have successfully logged out!"
    });
};
