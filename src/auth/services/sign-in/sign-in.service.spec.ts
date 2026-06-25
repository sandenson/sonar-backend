import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { FindUserByUsernameOrEmailService } from '../../../users/services/find-user-by-username-or-email/find-user-by-username-or-email.service';
import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;
  let findUserService: { execute: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    findUserService = {
      execute: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        {
          provide: FindUserByUsernameOrEmailService,
          useValue: findUserService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<SignInService>(SignInService);
  });

  it('should sign in using an email credential', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    findUserService.execute.mockResolvedValue({
      username: 'alice',
      email: 'alice@example.com',
      password: '$2b$10$dummyhash',
    });
    jwtService.signAsync.mockResolvedValue('jwt-token');

    const result = await service.execute({
      email: 'alice@example.com',
      password: 'Strong12!@',
    } as never);

    expect(findUserService.execute).toHaveBeenCalledWith(
      'alice@example.com',
      true,
    );
    expect(result.access_token).toBe('jwt-token');
  });
});
