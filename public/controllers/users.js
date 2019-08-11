const User = require('../models/user');

exports.getUsers = (req, res) => {
    User.find().then(users => {
        if (!users) {
            return res.status(204).json({
                message: 'No-Content!'
            });
        }

        res.status(200).json({
            users: users
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: process.env.UNKNOWN_ERROR_MSG
        });
    });
};

exports.createUser = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(user => {
        res.status(201).json({
            message: 'Your account has been created!',
            user: user
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: process.env.UNKNOWN_ERROR_MSG
        });
    });
};

exports.loginUser = (req, res) => {
    res.status(200).json({
        message: 'You have successfully connected!',
        user: req.user
    });
};

exports.logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({
        message: "You have successfully logged out!"
    });
};
