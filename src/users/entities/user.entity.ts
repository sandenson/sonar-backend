import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Index('USER_UNIQUE_USERNAME_LOWER', { synchronize: false })
@Index('USER_UNIQUE_EMAIL_LOWER', { synchronize: false })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'UUID gerado' })
  id!: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'Nome de usuário', example: 'sigma67' })
  username!: string;

  @Column({ length: 200 })
  @ApiProperty({ example: 'exemplo@email.com' })
  email!: string;

  @Column({ select: false, nullable: false })
  @ApiProperty({ description: 'Senha criptografada', example: 'Strong12!@' })
  password?: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({
    description: 'Data de cadastro do usuário',
    example: new Date('1972-05-27'),
  })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({
    description: 'Data da atualização mais recente do cadastro do usuário',
    example: new Date('1972-05-27'),
  })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({
    description: 'Data de deleção do usuário',
    example: new Date('1972-05-27'),
  })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await hash(this.password, 10);
    }
  }
}
