import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './create-user.controller';
// 1. Você importa o Service real que o controller usa (estou supondo o nome)
import { CreateUserService } from './create-user.service'; 

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let service: CreateUserService;

  // 2. Criamos o "Mock" do serviço. 
  // O Jest vai fingir que executou a função e retornar esses dados falsos.
  const mockCreateUserService = {
    execute: jest.fn().mockResolvedValue({ id: 1, name: 'Teste', email: 'teste@email.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      // 3. Aqui vem a mágica! Dizemos para o Nest usar o Mock no lugar do Service verdadeiro.
      providers: [
        {
          provide: CreateUserService,
          useValue: mockCreateUserService,
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    service = module.get<CreateUserService>(CreateUserService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  // 4. Testando a rota de verdade!
  it('deve repassar os dados para o service e retornar o usuário criado', async () => {
    // Simulamos os dados que chegariam via POST (Body)
    const dto = { name: 'Teste', email: 'teste@email.com', password: '123' };
    
    // Chamamos a função do controller (estou supondo que ela se chame 'create')
    const result = await controller.create(dto);
    
    // Verificamos se o controller chamou o Service passando os dados certos
    expect(service.execute).toHaveBeenCalledWith(dto);
    
    // Verificamos se o controller devolveu o que o Service gerou
    expect(result).toEqual({ id: 1, name: 'Teste', email: 'teste@email.com' });
  });
});