import {IsNotEmpty, IsString, Length, IsEmail, IsOptional} from 'class-validator';
import {User} from '../user/user.entity';

export class SignInDTO {
  @IsNotEmpty()
  @Length(0, 100)
  @IsString()
  email!: string;

  @IsNotEmpty()
  @Length(0, 100)
  @IsString()
  password!: string;
}

export interface SignInResponse {
  user: Omit<User, 'hashedPassword'>;
  accessToken: string;
}

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(0, 100)
  email!: string;

  @IsNotEmpty()
  @Length(0, 100)
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  address!: string;

  @Length(0, 100)
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
