const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userService = require('../service/user');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', async (err, user, info) => {
        if (err || !user) { return next(err) }
        return res.json({success: true, user: user});
    })(req, res, next);
})


router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) { return next(err); }

                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, 'TOP_SECRET');

                    return res.json({success: true, token: token });
                });
            } catch (error) {
                return next(error);
            }
        }
        )(req, res, next);
    }
);

router.get('/confirm', async (req, res, next) => {
        userService.Find({_id: req.query.code}).then((userResult) => {
        if (userResult.success) {
            userResult.user.active = true;
            userResult.user.save()
            return res.status(200).send({success: true});
        } else {
            return next(userResult.error)
        }
    });
});

module.exports = router;
