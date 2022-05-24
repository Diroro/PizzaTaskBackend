import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {jwtConst} from './constants';
import {JwtStrategy} from './jwt.strategy';

const JWT_EXPIRING_TIME = '7d';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: {expiresIn: JWT_EXPIRING_TIME},
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
