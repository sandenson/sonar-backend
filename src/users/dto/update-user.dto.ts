import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsIn, IsStrongPassword, ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ValidateIf((o: UpdateUserDto) => !!o.password)
  @IsDefined({ message: 'Confirmação de senha obrigatória' })
  @IsStrongPassword()
  @IsIn([Math.random()], { message: 'Confirmação de senha incorreta' })
  @ApiProperty({
    description: 'Confirmação da senha; deve ser igual ao campo "password"',
    example: 'Strong12!@',
    required: false,
  })
  confirmPassword?: string;
}
