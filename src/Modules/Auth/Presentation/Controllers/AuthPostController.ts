import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateCommand } from '../../Handlers/Commands/UserCreateCommand';

@Controller()
export class AuthPostController {
  constructor(private commandBus: CommandBus) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: { username: string; password: string }) {
    const payload = {
      ...body,
    };
    await this.commandBus.execute(new UserCreateCommand(payload));
    return;
  }
}
