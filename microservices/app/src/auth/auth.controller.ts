import {Controller, Post, Body, UnauthorizedException, UseGuards, Get, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInDTO, SignUpDTO, SignInResponse} from './auth.DTO';
import {JwtOptionalAuthGuard} from './jwt-optional-auth.guard';
import {User} from '../user/user.entity';

interface RequestWithUser {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInDTO): Promise<SignInResponse> {
    const {email, password} = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.signIn(user);
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO): Promise<SignInResponse> {
    return this.authService.signUp(body);
  }

  @UseGuards(JwtOptionalAuthGuard)
  @Get('me')
  async getMyUser(@Req() req: RequestWithUser): Promise<User | undefined> {
    const user = req.user ? req.user : undefined;
    return user;
  }
}
