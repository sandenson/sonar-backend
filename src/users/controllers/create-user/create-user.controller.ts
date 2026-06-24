import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateUserService } from 'src/users/services/create-user/create-user.service';

@Controller('user')
@ApiTags('users', 'create')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Cria novo usuário e retorna o registro salvo',
    type: User,
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
      fieldMissing: {
        summary: 'Bad Request: [campo] deve respeitar [restrição de esquema]',
        value: {
          message: [
            'username must be shorter than or equal to 50 characters',
            'Nome de usuário não pode conter espaços em branco',
            'username should not be empty',
            'username must be a string',
            'email must be shorter than or equal to 200 characters',
            'email must be an email',
            'password is not strong enough',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.createUserService.execute(data);
  }
}
