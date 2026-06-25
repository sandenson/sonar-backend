import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepo.create(data);
      return await this.usersRepo.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        /unique_(?:username|email)/gi.test(error.message)
      ) {
        throw new BadRequestException('Email ou nome de usuário já existe');
      }

      throw error;
    }
  }
}
