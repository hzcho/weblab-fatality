import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import User from '@models/user';
import { UnauthorizedError } from '@utils/errors';

interface JwtPayload {
  id: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload: JwtPayload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(new UnauthorizedError('Пользователь не найден'), false);
      }
    } catch (err) {
      return done(err as Error, false);
    }
  }),
);

export default passport;
