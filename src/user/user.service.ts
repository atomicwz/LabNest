import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  create(createUserData: CreateUserDto) {
    const user = this.userRepository.create(createUserData);

    return this.userRepository.save(user);
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
