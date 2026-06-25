import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserService } from './update-user.service';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let repo: { update: jest.Mock; findOne: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    repo = {
      update: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: getRepositoryToken(User),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a user and return the updated data', async () => {
    const userId = '123';
    const updateDto = { name: 'Novo Nome' };
    const mockUpdatedUser = {
      id: userId,
      name: 'Novo Nome',
      email: 'usuario@example.com',
    };

    repo.update.mockResolvedValue({ affected: 1 });
    repo.findOne.mockResolvedValue(mockUpdatedUser);

    const result = await service.execute(userId, updateDto as never);

    expect(repo.update).toHaveBeenCalledWith(userId, updateDto);
    expect(result).toEqual(mockUpdatedUser);
  });
});