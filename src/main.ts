import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/App/AppModule';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(8080);
})();
