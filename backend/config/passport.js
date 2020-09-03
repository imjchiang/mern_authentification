require("dotenv").config();

//passport strategy for authenticating with a JSON web token
//this allows to authenticate endpoints using the token
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const { deserializeUser } = require('passport');
const User = mongoose.model("User");
const db = require("../models");

//options is an object literal containing options to control how the token is extracted from the request or verified
const options = {}
//jwtFromRequest (REQUIRED) function that accepts a request as the only parameter and returns either the JWT as a string or null
//fromAuthHeaderAsBearerToken() creates an extractor that looks for the JWT in the auth header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) =>
{
    passport.use(new JwtStrategy(options, (jwt_payload, done) =>
    {
        //jwt_payload is an object literal containing the decoded JWT payload
        //done is a passport callback that has error first as an argument done(error, user, info)
        User.findById(jwt_payload.id)
        .then(user => 
        {
            if (user)
            {
                //if the user is found, return null (for error) and user
                return done(null, user);
            }
            else
            {
                //if no user is found
                return done(null, false);
            }
        })
        .catch(err =>
        {
            console.log(err);
        })
    }));
}