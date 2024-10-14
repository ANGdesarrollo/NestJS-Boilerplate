import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export class TestModule {
  private async initializeApp(
    metadata: ModuleMetadata,
  ): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule(metadata).compile();
    const app = testingModule.createNestApplication();
    await app.init();
    return app;
  }

  async getTestAgent(metadata: ModuleMetadata) {
    const app = await this.initializeApp(metadata);
    const req = request(app.getHttpServer());
    return {
      app,
      request: req,
    };
  }
}
