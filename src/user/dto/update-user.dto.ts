import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  @MinLength(5, { message: 'Senha muita curta' })
  readonly password: string;
}
