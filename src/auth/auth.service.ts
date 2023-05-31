import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userRepository.findOne({ email: email });

    const verify = await compare(pass, user.password);

    if (!verify) throw new HttpException('Credenciais Incorretas.', 200);

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
      userName: user.name,
      id: user.id,
    };
  }
}
