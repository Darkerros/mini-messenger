import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private usersRepository: typeof UserModel,
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.usersRepository.create(dto);
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
  }

  async getAllUsers() {
    return await this.usersRepository.findAll({
      include: { all: true },
      attributes: { exclude: ['password'] },
    });
  }

  async updateUserInfo(id: number, dto: UpdateUserDto) {
    return await this.usersRepository.update(dto, { where: { id } });
  }
}
