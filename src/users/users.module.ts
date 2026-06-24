import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { User } from './entities/user.entity';
import { CreateUserService } from './services/create-user/create-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserService],
  controllers: [CreateUserController],
})
export class UsersModule {}
