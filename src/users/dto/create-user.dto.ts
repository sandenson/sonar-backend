import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @Matches(/^\S+$/, {
    message: 'Nome de usuário não pode conter espaços em branco',
  })
  @MaxLength(50)
  @ApiProperty({
    description:
      'Nome de usuário não pode ter espaços em branco nem mais de 50 caracteres',
    example: 'sigma67',
  })
  username!: string;

  @IsEmail()
  @MaxLength(200)
  @ApiProperty({
    description: 'Email não pode ter mais de 200 caracteres',
    example: 'exemplo@email.com',
  })
  email!: string;

  @Transform(({ value }) => (value as string).trim())
  @IsStrongPassword(
    {},
    {
      message:
        'A senha deve conter pelo menos 8 caracteres, 1 caractere especial, 1 algarismo, 1 letra maiúscula e 1 minúscula',
    },
  )
  @ApiProperty({
    description:
      'Senha contendo pelo menos 8 caracteres, 1 caractere especial, 1 algarismo, 1 letra maiúscula e 1 minúscula',
    example: 'Strong12!@',
  })
  password!: string;
}
