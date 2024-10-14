import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateCommand } from '../Commands/UserCreateCommand';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  async execute(command: UserCreateCommand) {}
}
