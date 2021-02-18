const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const emailService = require('../service/email') // Send email at signup
const utilityService = require('../service/utility')

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.create({email, password});
                emailService.SendMail({to: email, html: `<h3>confirm your account:</h3><h4><a href="${utilityService.ServerURL}/user/confirm?code=${user._id}"</h4>`})
                return done(null, user);
            } catch (error) {
                // User already exist
                if (error.code === 11000) {
                    done("User already exist")
                } else {
                    done(error)
                }
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({email});

                if (!user) {
                    return done('User not found');
                }

                // Email not confirmed
                if(!user.active) {
                    return done('You must confirm your email');
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done('Wrong Password');
                }

                return done(null, user, {message: 'Logged in Successfully'});
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

