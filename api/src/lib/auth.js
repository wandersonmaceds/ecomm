import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const configureAuth = (accountRepository) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
  }
  const verify = (payload, callback) => {
      accountRepository
        .findByID(payload)
        .then((account) => {
          callback(null, account);
        })
        .catch((err) => {
          callback(err);
        })
  }
  
  passport.use(new Strategy(options, verify));
  
  return () => {
    return passport.authenticate('jwt', { session: false });
  }
}