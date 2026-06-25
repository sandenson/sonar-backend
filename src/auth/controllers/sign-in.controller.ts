import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateUserService } from 'src/users/services/create-user/create-user.service';
import { AccessTokenDto } from '../dto/access-token.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignInService } from '../services/sign-in/sign-in.service';

@Controller('auth')
@ApiTags('auth')
export class SignInController {
  constructor(
    private readonly signInService: SignInService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Cria novo usuário e retorna o registro salvo',
    type: User,
  })
  register(@Body() data: CreateUserDto): Promise<User> {
    return this.createUserService.execute(data);
  }

  @Post('login')
  @Post('signin')
  @ApiOkResponse({
    description: 'Retorna token JWT referente ao usuário',
    type: AccessTokenDto,
  })
  @ApiNotFoundResponse({
    description:
      'Não foi encontrado um usuário com o nome de usuário correspondente',
    examples: {
      userNotFound: {
        summary:
          'Não foi encontrado um usuário com o nome de usuário correspondente',
        value: {
          message: 'Usuário não encontrado',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'A checagem de senha falhou',
    examples: {
      unauthorized: {
        summary:
          'Não foi encontrado um usuário com o nome de usuário correspondente',
        value: {
          message: 'Nome de usuário ou senha incorreto',
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    },
  })
  findUserByUsernameOrEmail(@Body() data: SignInDto): Promise<AccessTokenDto> {
    return this.signInService.execute(data);
  }
}
