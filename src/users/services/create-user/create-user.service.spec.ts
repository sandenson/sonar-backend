import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../entities/user.entity';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let repo: { create: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: getRepositoryToken(User),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should create a user using the provided name when username is not sent', async () => {
    const createdUser = {
      id: 'user-1',
      username: 'Alice',
      email: 'alice@example.com',
      password: 'hashed-password',
    };

    repo.create.mockReturnValue(createdUser);
    repo.save.mockResolvedValue(createdUser);

    const result = await service.execute({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'Strong12!@',
    } as never);

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({ username: 'Alice' }),
    );
    expect(repo.save).toHaveBeenCalled();
    expect(result.username).toBe('Alice');
  });
});
