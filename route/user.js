const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userService = require('../service/user');

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        success: true,
        user: req.user
      });
    }
  );

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    // Depending on if you want to hide error details to client, multiple implementation possible
                    // const error = new Error('An error occurred.');
                    return next(err);
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
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

router.get('/confirm', async (req, res) => {
        userService.Find({_id: req.params.code}).then((userResult) => {
        if (userResult.success) {
            userResult.user.active = true;
            userResult.user.save()
            return res.status(200).send({success: true});
        } else {
            return res.status(409).send(userResult);
        }
    });
});

module.exports = router;