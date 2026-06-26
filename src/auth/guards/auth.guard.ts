import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'node:http';
import { AccessTokenPayloadDto } from '../../auth/dto/access-token-payload.dto';

interface CustomIncomingMessage extends IncomingMessage {
  user?: AccessTokenPayloadDto;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
