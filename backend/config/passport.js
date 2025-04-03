const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
  passport.use(new JWTStrategy(options, (jwtPayload, done) => {
    try {
      if (jwtPayload.admin) {
        return done(null, { role: 'admin' });
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));
};