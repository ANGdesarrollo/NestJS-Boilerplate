import { TestModule } from '../../../../TestModule';
import { AppModule } from '../../../../../src/Modules/App/AppModule';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppController } from '../../../../../src/Modules/App/Presentation/Controllers/AppController';
import { describe } from 'node:test';
import TestAgent from 'supertest/lib/agent';
import { INestApplication } from '@nestjs/common';

describe('App Healthcheck Controller', () => {
  let appController: AppController;
  let request: TestAgent;
  let app: INestApplication;

  beforeAll(async () => {
    const testModule = new TestModule();
    const metadata: ModuleMetadata = {
      imports: [AppModule],
      controllers: [AppController],
    };

    const agent = await testModule.getTestAgent(metadata);

    app = agent.app;
    request = agent.request;

    appController = app.get<AppController>(AppController);
  });

  describe('controller exists', () => {
    it('should check that controller exists', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('healthcheck', () => {
    it('should return status code 200', async () => {
      const response = await request.get('/');

      expect(response.statusCode).toEqual(200);
    });
  });
});
