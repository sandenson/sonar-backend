import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { FindUserByUsernameOrEmailService } from './find-user-by-username-or-email.service';

describe('FindUserByUsernameOrEmailService', () => {
  let service: FindUserByUsernameOrEmailService;
  let repo: { findOne: jest.Mock };

  beforeEach(async () => {
    repo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByUsernameOrEmailService,
        {
          provide: getRepositoryToken(User),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<FindUserByUsernameOrEmailService>(
      FindUserByUsernameOrEmailService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user when found in the database', async () => {
    const mockUser = {
      id: 'user-1',
      username: 'alice',
      email: 'alice@example.com',
      password: 'hashed-password',
    };

    repo.findOne.mockResolvedValue(mockUser);

    const result = await service.execute('alice@example.com', true as never);

    expect(repo.findOne).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });
});