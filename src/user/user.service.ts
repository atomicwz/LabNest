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
import { hash } from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { HelperFile } from '../config/helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({ isAdmin: false });
  }

  async findAllAdmins(id: string) {
    const userAdmin = await this.userRepository.findOne({
      id: id,
      isAdmin: true,
    });
    if (!userAdmin)
      throw new HttpException(
        'O usuário não é administrador.',
        HttpStatus.FORBIDDEN,
      );

    return this.userRepository.find({ isAdmin: true });
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
      isAdmin: false,
      password: hashedPassword,
    });
  }

  async createAdmin(id: string, createUserData: CreateUserDto) {
    const userAdmin = await this.userRepository.findOne({
      id: id,
      isAdmin: true,
    });

    if (!userAdmin)
      throw new HttpException(
        'O usuário não é administrador.',
        HttpStatus.FORBIDDEN,
      );

    const userAlreadyRegistred = await this.userRepository.findOne({
      email: createUserData.email,
    });

    if (userAlreadyRegistred)
      throw new HttpException(
        'Este email já foi cadastrado.',
        HttpStatus.BAD_REQUEST,
      );

    const user = this.userRepository.create({
      ...createUserData,
      isAdmin: true,
    });

    const hashedPassword = await hash(createUserData.password, 8);
    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async update(id: string, updateUser: UpdateUserDto) {
    if (!id) {
      throw new NotFoundException(`Usuário não encontrado. ID: ${id}`);
    }

    const user = {
      email: updateUser.email,
      name: updateUser.name,
    };

    return this.userRepository.save({ id: id, ...user });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado. ID: ${id}`);
    }

    return this.userRepository.remove(user);
  }

  async updateAvatar(id: string, file: string, fileName: string) {
    const userAvatar = await this.userRepository.findOne(id);

    if (userAvatar.avatar === null || userAvatar.avatar === '') {
      await this.userRepository.update(id, {
        avatar: file,
      });
    } else {
      await HelperFile.removeFile(userAvatar.avatar);
      await this.userRepository.update(id, {
        avatar: file,
      });
    }
    const user = await this.userRepository.findOne(id);

    return user;
  }
}
