require("dotenv").config();

//passport strategy for authenticating with a JSON web token
//this allows to authenticate endpoints using the token
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;