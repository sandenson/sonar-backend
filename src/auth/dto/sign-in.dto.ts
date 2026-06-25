import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class SignInDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ValidateIf((obj: SignInDto) => !obj.email)
  @IsString({ message: 'Nome de usuário deve ser texto' })
  @IsNotEmpty({ message: 'Insira nome de usuário ou email' })
  @ApiProperty({
    description: 'Nome de usuário do usuário fazendo login',
    example: 'sigma67',
    required: false,
  })
  username?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ValidateIf((obj: SignInDto, value) => !obj.username && !!value)
  @IsNotEmpty({ message: 'Insira nome de usuário ou email' })
  @IsEmail({}, { message: 'Endereço de email inválido' })
  @ApiProperty({
    description: 'Endereço de email do usuário fazendo login',
    example: 'exemplo@email.com',
    required: false,
  })
  email?: string;

  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty({ message: 'Insira a senha' })
  @ApiProperty({
    description: 'Senha do usuário fazendo login',
    example: 'Strong12!@',
  })
  password!: string;
}
