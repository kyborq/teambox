import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  @MinLength(8)
  password: string;
}
