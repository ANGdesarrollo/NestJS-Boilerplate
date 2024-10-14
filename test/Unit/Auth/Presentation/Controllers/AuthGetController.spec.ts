import { TestModule } from '../../../../TestModule';
import { AppModule } from '../../../../../src/Modules/App/AppModule';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AuthGetController } from '../../../../../src/Modules/Auth/Presentation/Controllers/AuthGetController';
import { INestApplication } from '@nestjs/common';
import TestAgent from 'supertest/lib/agent';

describe('Get Auth Controller', () => {
  let authGetController: AuthGetController;
  let request: TestAgent;
  let app: INestApplication;

  beforeAll(async () => {
    const testModule = new TestModule();
    const metadata: ModuleMetadata = {
      imports: [AppModule],
      controllers: [AuthGetController],
    };

    const agent = await testModule.getTestAgent(metadata);

    app = agent.app;
    request = agent.request;

    authGetController = app.get<AuthGetController>(AuthGetController);
  });

  describe('controller exists', () => {
    it('should check that controller exists', () => {
      expect(authGetController).toBeDefined();
    });
  });
});
