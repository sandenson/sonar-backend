import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { FindUserByUsernameOrEmailController } from './controllers/find-user-by-username-or-email/find-user-by-username-or-email.controller';
import { UpdateUserController } from './controllers/update-user/update-user.controller';
import { User } from './entities/user.entity';
import { CreateUserService } from './services/create-user/create-user.service';
import { FindUserByUsernameOrEmailService } from './services/find-user-by-username-or-email/find-user-by-username-or-email.service';
import { UpdateUserService } from './services/update-user/update-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    CreateUserService,
    FindUserByUsernameOrEmailService,
    UpdateUserService,
  ],
  controllers: [
    CreateUserController,
    FindUserByUsernameOrEmailController,
    UpdateUserController,
  ],
  exports: [FindUserByUsernameOrEmailService],
})
export class UsersModule {}
