import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {User} from '../user/user.entity';

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt') {
  handleRequest<User>(err: Error, user: User): User {
    return user;
  }
}
