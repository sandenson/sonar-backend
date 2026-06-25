import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SkipAuth } from '../../../auth/decorators/skip-auth/skip-auth.decorator';
import { AccessTokenDto } from '../../dto/access-token.dto';
import { SignInDto } from '../../dto/sign-in.dto';
import { SignInService } from '../../services/sign-in/sign-in.service';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(SignInDto)
@SkipAuth()
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('login')
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Retorna token JWT referente ao usuário',
    type: AccessTokenDto,
  })
  @ApiBadRequestResponse({
    description:
      'Corpo da requisição não passou a validação de esquema ou não respeita as restrições do banco de dados',
    examples: {
      validationFailed: {
        summary: 'Bad Request: Validação de esquema falhou',
        value: {
          message: [
            'Nome de usuário deve ser texto',
            'Insira nome de usuário ou email',
            'Endereço de email inválido',
            'Insira a senha',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
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
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SignInDto) },
        {
          type: 'object',
          anyOf: [
            {
              type: 'object',
              required: ['username'],
              description:
                'Requer o nome de usuário se o email não for fornecido',
            },
            {
              type: 'object',
              required: ['email'],
              description:
                'Requer o email se o nome de usuário não for fornecido',
            },
          ],
        },
      ],
    },
    examples: {
      withUsername: {
        summary: 'Com nome de usuário',
        description: 'Login com nome de usuário',
        value: {
          username: 'sigma67',
          password: 'Strong12!@',
        },
      },
      withEmail: {
        summary: 'Com email',
        description: 'Login com email',
        value: {
          email: 'exemplo@email.com',
          password: 'Strong12!@',
        },
      },
    },
  })
  async signIn(@Body() data: SignInDto): Promise<AccessTokenDto> {
    return this.signInService.execute(data);
  }
}
