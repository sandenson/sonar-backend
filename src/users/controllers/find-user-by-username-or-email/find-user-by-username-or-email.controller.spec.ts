import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByUsernameOrEmailController } from './find-user-by-username-or-email.controller';

describe('FindUserByUsernameOrEmailController', () => {
  let controller: FindUserByUsernameOrEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByUsernameOrEmailController],
    }).compile();

    controller = module.get<FindUserByUsernameOrEmailController>(
      FindUserByUsernameOrEmailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
