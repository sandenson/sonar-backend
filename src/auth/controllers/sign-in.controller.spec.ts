import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../../../users/services/create-user/create-user.service';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';

describe('SignInController', () => {
  let controller: SignInController;
  let signInService: SignInService; 

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
    
   
    signInService = module.get<SignInService>(SignInService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve repassar os dados de login para o SignInService e retornar o token', async () => {
    
    const loginDto = { email: 'teste@email.com', password: '123' };
    const expectedResponse = { access_token: 'token-jwt-falso' };


    jest.spyOn(signInService, 'execute').mockResolvedValue(expectedResponse);

    const result = await controller.handle(loginDto);


    expect(signInService.execute).toHaveBeenCalledWith(loginDto);
    

    expect(result).toEqual(expectedResponse);
  });
});