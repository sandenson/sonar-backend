import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AccessTokenDto } from 'src/auth/dto/access-token.dto';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { FindUserByUsernameOrEmailService } from 'src/users/services/find-user-by-username-or-email/find-user-by-username-or-email.service';

@Injectable()
export class SignInService {
  constructor(
    private readonly findUserService: FindUserByUsernameOrEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: SignInDto): Promise<AccessTokenDto> {
    const { password } = data;
    const user = await this.findUserService.execute(
      (data.username || data.email)!,
      true,
    );

    if (await compare(password, user.password!)) {
      return {
        access_token: await this.jwtService.signAsync({
          sub: user.email,
          username: user.username,
        }),
      };
    }

    throw new UnauthorizedException('Nome de usuário ou senha incorreto');
  }
}
//
