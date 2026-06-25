import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @ApiProperty({
    description: 'Nome de usuário do usuário fazendo login',
    example: 'sigma67',
    required: false,
  })
  username?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value as string).trim())
  @ApiProperty({
    description: 'E-mail do usuário fazendo login',
    example: 'exemplo@email.com',
    required: false,
  })
  email?: string;

  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário fazendo login',
    example: 'Strong12!@',
  })
  password!: string;
}
