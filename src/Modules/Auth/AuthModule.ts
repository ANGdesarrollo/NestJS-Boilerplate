import { Module } from '@nestjs/common';
import { authControllers } from './Presentation/Controllers';
import { authHandlers } from './Handlers/Handlers';

@Module({
  imports: [],
  controllers: [...authControllers],
  providers: [...authHandlers],
})
export class AuthModule {}
