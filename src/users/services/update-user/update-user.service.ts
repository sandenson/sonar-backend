import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateUserDto } from '../../../users/dto/update-user.dto';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async execute(username: string, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepo.findOneBy({ username });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const updated = this.usersRepo.merge(user, data);
      return await this.usersRepo.save(updated);
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
