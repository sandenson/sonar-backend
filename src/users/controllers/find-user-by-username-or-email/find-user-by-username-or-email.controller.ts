import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../../users/entities/user.entity';
import { FindUserByUsernameOrEmailService } from '../../../users/services/find-user-by-username-or-email/find-user-by-username-or-email.service';

@Controller('user')
@ApiTags('users', 'find-by')
export class FindUserByUsernameOrEmailController {
  constructor(
    private readonly findUserByUsernameOrEmailService: FindUserByUsernameOrEmailService,
  ) {}

  @Get(':usernameEmail')
  @ApiOkResponse({
    description:
      'Retorna usuário com nome de usuário ou endereço de email correspondente',
    type: User,
  })
  @ApiNotFoundResponse({
    description:
      'Não foi encontrado um usuário com nome de usuário ou endereço de email correspondente',
    examples: {
      userNotFound: {
        summary:
          'Não foi encontrado um usuário com nome de usuário ou endereço de email correspondente',
        value: {
          message: 'Usuário não encontrado',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
  })
  findUserByUsernameOrEmail(
    @Param('usernameEmail') usernameEmail: string,
  ): Promise<User> {
    return this.findUserByUsernameOrEmailService.execute(usernameEmail);
  }
}
