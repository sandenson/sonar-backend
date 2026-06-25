import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class FindUserByUsernameOrEmailService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async execute(
    usernameEmail: string,
    selectPassword: boolean = false,
  ): Promise<User> {
    const value = usernameEmail.toLowerCase();

    const query = this.usersRepo.createQueryBuilder('u').where([
      {
        username: Raw((alias) => `LOWER(${alias}) = :value`, {
          value,
        }),
      },
      {
        email: Raw((alias) => `LOWER(${alias}) = :value`, {
          value,
        }),
      },
    ]);

    if (selectPassword) {
      query.addSelect('u.password');
    }

    const user = await query.getOne();

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
