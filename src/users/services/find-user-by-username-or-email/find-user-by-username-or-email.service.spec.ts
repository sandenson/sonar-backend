import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByUsernameOrEmailService } from './find-user-by-username-or-email.service';

describe('FindUserByUsernameOrEmailService', () => {
  let service: FindUserByUsernameOrEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserByUsernameOrEmailService],
    }).compile();

    service = module.get<FindUserByUsernameOrEmailService>(
      FindUserByUsernameOrEmailService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
