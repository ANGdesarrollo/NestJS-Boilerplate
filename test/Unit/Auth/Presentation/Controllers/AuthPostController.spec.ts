import { AuthPostController } from '../../../../../src/Modules/Auth/Presentation/Controllers/AuthPostController';
import { TestModule } from '../../../../TestModule';
import { AppModule } from '../../../../../src/Modules/App/AppModule';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { INestApplication } from '@nestjs/common';
import { UserCreateHandler } from '../../../../../src/Modules/Auth/Handlers/Handlers/UserCreateHandler';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateCommand } from '../../../../../src/Modules/Auth/Handlers/Commands/UserCreateCommand';

describe('Post Auth Controller', () => {
  let authPostController: AuthPostController;
  let app: INestApplication;
  let commandBus: CommandBus;

  beforeAll(async () => {
    const testModule = new TestModule();
    const metadata: ModuleMetadata = {
      imports: [AppModule],
      controllers: [AuthPostController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    };

    const agent = await testModule.getTestAgent(metadata);
    app = agent.app;

    authPostController = app.get<AuthPostController>(AuthPostController);
    commandBus = app.get<CommandBus>(CommandBus);
  });

  describe('controller exists', () => {
    it('should check that controller exists', () => {
      expect(authPostController).toBeDefined();
    });
  });

  describe('create user', () => {
    it('should check that method create exists', () => {
      expect(authPostController.create).toBeDefined();
    });

    it('should call method create', async () => {
      const mockUser = { username: 'testUser', password: 'testPassword' };
      const createSpy = jest.spyOn(authPostController, 'create');
      await authPostController.create(mockUser);

      expect(createSpy).toHaveBeenCalledWith(mockUser);
    });

    it('should create and execute the correct command', async () => {
      const mockUser = { username: 'testUser', password: 'testPassword' };
      const executeSpy = jest.spyOn(commandBus, 'execute');

      await authPostController.create(mockUser);

      expect(executeSpy).toHaveBeenCalled();
    });
  });
});
