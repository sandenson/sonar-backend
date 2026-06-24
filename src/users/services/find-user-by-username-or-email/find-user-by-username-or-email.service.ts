import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class FindUserByUsernameOrEmailService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async execute(usernameEmail: string): Promise<User> {
    const value = usernameEmail.toLowerCase();

    const user = await this.usersRepo.findOne({
      where: [
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
      ],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
