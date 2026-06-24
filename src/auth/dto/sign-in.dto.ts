import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome de usuário do usuário fazendo login',
    example: 'sigma67',
  })
  username!: string;

  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário fazendo login',
    example: 'Strong12!@',
  })
  password!: string;
}
