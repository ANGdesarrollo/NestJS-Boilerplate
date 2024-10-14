import { Module } from '@nestjs/common';
import { AppService } from '../../app.service';
import { AppController } from './Presentation/Controllers/AppController';
import { AuthModule } from '../Auth/AuthModule';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
