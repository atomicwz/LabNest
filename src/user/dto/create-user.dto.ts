import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(5, { message: 'Senha muita curta' })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
