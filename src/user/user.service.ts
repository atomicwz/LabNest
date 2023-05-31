import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      email: email,
    });
  }

  async create(createUserData: CreateUserDto) {
    const userAlreadyRegistred = await this.userRepository.findOne({
      email: createUserData.email,
    });

    if (userAlreadyRegistred)
      throw new HttpException(
        'Este email já foi cadastrado.',
        HttpStatus.BAD_REQUEST,
      );

    const user = this.userRepository.create(createUserData);

    const hashedPassword = await hash(createUserData.password, 8);
    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  update(id: string, updateUser: UpdateUserDto) {
    if (!updateUser) {
      throw new NotFoundException(`Usuário não encontrado. ID: ${id}`);
    }

    return this.userRepository.save(updateUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado. ID: ${id}`);
    }

    return this.userRepository.remove(user);
  }
}
