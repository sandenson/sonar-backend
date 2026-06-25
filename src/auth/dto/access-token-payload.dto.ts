import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenPayloadDto {
  @ApiProperty({
    description: 'Email do usuário logado',
    example: 'exemplo@email.com',
  })
  sub!: string;

  @ApiProperty({
    description: 'Nome de usuário do usuário logado',
    example: 'sigma67',
  })
  username!: string;
}
