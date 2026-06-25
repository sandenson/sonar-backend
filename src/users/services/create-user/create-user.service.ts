import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    try {
      const username = data.username ?? data.name ?? data.email.split('@')[0];
      const user = this.usersRepo.create({
        username,
        email: data.email,
        password: data.password,
      });
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
