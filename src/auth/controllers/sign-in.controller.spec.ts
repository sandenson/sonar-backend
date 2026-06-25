import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../../../users/services/create-user/create-user.service';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';

describe('SignInController', () => {
  let controller: SignInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignInController],
      providers: [
        {
          provide: SignInService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateUserService,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<SignInController>(SignInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
