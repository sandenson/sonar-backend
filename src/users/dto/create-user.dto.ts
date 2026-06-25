import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @Matches(/^\S+$/, {
    message: 'Nome de usuário não pode conter espaços em branco',
  })
  @MaxLength(50, {
    message: 'Nome de usuário não pode ter mais de 50 caracteres',
  })
  @ApiProperty({
    description:
      'Nome de usuário do usuário; não pode conter mais de 50 caracteres ou espaços em branco',
    example: 'sigma67',
    required: false,
  })
  username?: string;

  @IsEmail()
  @MaxLength(200, { message: 'Email não pode ter mais de 200 caracteres' })
  @ApiProperty({
    description: 'Email do usuário; não pode conter mais de 200 caracteres',
    example: 'exemplo@email.com',
  })
  email!: string;

  @Transform(({ value }) => (value as string).trim())
  @IsStrongPassword(undefined, {
    message:
      'A senha deve conter pelo menos 8 caracteres, 1 caractere especial, 1 algarismo, 1 letra maiúscula e 1 minúscula',
  })
  @ApiProperty({
    description:
      'Senha contendo pelo menos 8 caracteres, 1 caractere especial, 1 algarismo, 1 letra maiúscula e 1 minúscula',
    example: 'Strong12!@',
  })
  password!: string;
}
