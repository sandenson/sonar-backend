import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserController } from './update-user.controller';
import { UpdateUserService } from '../services/update-user/update-user.service';

describe('UpdateUserController', () => {
  let controller: UpdateUserController;
  let updateUserService: { execute: jest.Mock };

  beforeEach(async () => {
    updateUserService = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [
        {
          provide: UpdateUserService,
          useValue: updateUserService,
        },
      ],
    }).compile();

    controller = module.get<UpdateUserController>(UpdateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a user and return the updated data', async () => {
    const userId = '123';
    const updateDto = { name: 'Novo Nome' };
    const mockUpdatedUser = {
      id: userId,
      name: 'Novo Nome',
      email: 'usuario@example.com',
    };

    updateUserService.execute.mockResolvedValue(mockUpdatedUser);

    const result = await controller.handle(userId, updateDto as never);

    expect(updateUserService.execute).toHaveBeenCalledWith(userId, updateDto);
    expect(result).toEqual(mockUpdatedUser);
  });
});