import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(30)
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(5, { message: 'Senha muita curta' })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
