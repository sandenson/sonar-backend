import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { AccessTokenPayloadDto } from 'src/auth/dto/access-token-payload.dto';
import { User } from 'src/users/entities/user.entity';
import { FindUserByUsernameOrEmailService } from 'src/users/services/find-user-by-username-or-email/find-user-by-username-or-email.service';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth('jwt-auth')
export class MeController {
  constructor(
    private readonly findUserService: FindUserByUsernameOrEmailService,
  ) {}

  @Get('me')
  async getSelf(@CurrentUser() user: AccessTokenPayloadDto): Promise<User> {
    return await this.findUserService.execute(user.username);
  }
}
