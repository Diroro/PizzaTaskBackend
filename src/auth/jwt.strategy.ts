import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {jwtConst} from './constants';
import {User} from '../user/user.entity';

interface WithIatExp {
  iat: number;
  exp: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ingoreExpiration: false,
      secretOrKey: jwtConst.secret,
    });
  }

  async validate(payload: WithIatExp): Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {iat, exp, ...rest} = payload;
    return rest;
  }
}
