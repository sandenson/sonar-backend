import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { FindUserByUsernameOrEmailController } from './controllers/find-user-by-username-or-email/find-user-by-username-or-email.controller';
import { User } from './entities/user.entity';
import { CreateUserService } from './services/create-user/create-user.service';
import { FindUserByUsernameOrEmailService } from './services/find-user-by-username-or-email/find-user-by-username-or-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserService, FindUserByUsernameOrEmailService],
  controllers: [CreateUserController, FindUserByUsernameOrEmailController],
})
export class UsersModule {}
