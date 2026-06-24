import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @NotContains('\\s')
  @MaxLength(50)
  @ApiProperty({
    description: 'Nome de usuário não pode ter mais de 50 caracteres',
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

  @IsStrongPassword()
  @ApiProperty({ description: 'Senha criptografada', example: 'Strong12!@' })
  password!: string;
}
