import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../../../users/dto/update-user.dto';
import { User } from '../../../users/entities/user.entity';
import { UpdateUserService } from '../../../users/services/update-user/update-user.service';

@Controller('user')
@ApiTags('users', 'update')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Patch(':username')
  @ApiOkResponse({
    description:
      'Atualiza registro de usuário existente e retorna o novo estado do registro',
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
  @ApiBadRequestResponse({
    description:
      'Corpo da requisição não passou a validação de esquema ou não respeita as restrições do banco de dados',
    examples: {
      userExists: {
        summary: 'Bad Request: Email ou nome de usuário já existe',
        value: {
          message: 'Email ou nome de usuário já existe',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
      validationFailed: {
        summary: 'Bad Request: Validação de esquema falhou',
        value: {
          message: [
            'username must be shorter than or equal to 50 characters',
            'Nome de usuário não pode conter espaços em branco',
            'username should not be empty',
            'username must be a string',
            'email must be shorter than or equal to 200 characters',
            'email must be an email',
            'password is not strong enough',
            'Confirmação de senha obrigatória',
            'Confirmação de senha incorreta.',
            'confirmPassword is not strong enough',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  updateUser(
    @Param('username') username: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.execute(username, data);
  }
}
