import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'node:http';
import { AccessTokenPayloadDto } from '../../auth/dto/access-token-payload.dto';
import { IS_PUBLIC_KEY } from '../decorators/skip-auth/skip-auth.decorator';

interface CustomIncomingMessage extends IncomingMessage {
  user?: AccessTokenPayloadDto;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<CustomIncomingMessage>();
    const [type, token] = (request.headers.authorization ?? '').split(' ');

    if (type != 'Bearer') {
      throw new UnauthorizedException(
        'É preciso realizar login para acessar estes dados',
      );
    }

    try {
      const payload: AccessTokenPayloadDto =
        await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException(
        'Permissões inválidas; realize login novamente',
      );
    }

    return true;
  }
}
