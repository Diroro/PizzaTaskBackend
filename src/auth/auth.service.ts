import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {passwordUtils} from '../utils/password.utils';
import {User} from '../user/user.entity';
import {SignInResponse, SignUpDTO} from './auth.DTO';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.userService.findByEmail(email);

    if (user && passwordUtils.comparePasswords(password, user.hashedPassword)) {
      return user;
    }

    return undefined;
  }

  async signIn(user: User): Promise<SignInResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {hashedPassword, ...rest} = user;
    return {
      accessToken: this.jwtService.sign(rest),
      user: rest,
    };
  }

  async signUp(userData: SignUpDTO): Promise<SignInResponse> {
    const {email, password, address, firstName, lastName, phoneNumber} = userData;
    const hashedPassword = await passwordUtils.createHash(password);
    const user = new User(email, hashedPassword, address, phoneNumber, firstName, lastName);

    const savedUser = await this.userService.saveUser(user);

    return this.signIn(savedUser);
  }
}
