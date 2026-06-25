import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByUsernameOrEmailController } from './find-user-by-username-or-email.controller';
// Ajuste o caminho do import do Service conforme a estrutura da sua pasta
import { FindUserByUsernameOrEmailService } from '../services/find-user-by-username-or-email/find-user-by-username-or-email.service';

describe('FindUserByUsernameOrEmailController', () => {
  let controller: FindUserByUsernameOrEmailController;
  let findUserService: { execute: jest.Mock };

  beforeEach(async () => {
    // 1. Criamos o mock do serviço
    findUserService = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByUsernameOrEmailController],
      // 2. Injetamos o mock para o Controller não tentar usar o serviço real
      providers: [
        {
          provide: FindUserByUsernameOrEmailService,
          useValue: findUserService,
        },
      ],
    }).compile();

    controller = module.get<FindUserByUsernameOrEmailController>(
      FindUserByUsernameOrEmailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service passando o username ou email e retornar o usuário', async () => {
    // Preparamos a resposta falsa que o Mock vai retornar
    const mockUser = {
      username: 'alice',
      email: 'alice@example.com',
    };
    findUserService.execute.mockResolvedValue(mockUser);

    // O parâmetro que o Controller receberia da URL (ex: via @Param ou @Query)
    const identifier = 'alice@example.com';

    // Substitua "handle" pelo nome do método real do seu Controller (ex: find, execute)
    const result = await controller.handle(identifier);

    // Verificamos se o Controller passou o dado recebido para o Service
    expect(findUserService.execute).toHaveBeenCalledWith(identifier);
    
    // Verificamos se o Controller devolveu a resposta exata do Service
    expect(result).toEqual(mockUser);
  });
});