import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccessTokenDto } from '../dto/access-token.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignInService } from '../services/sign-in/sign-in.service';

@Controller('auth')
@ApiTags('auth')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

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
