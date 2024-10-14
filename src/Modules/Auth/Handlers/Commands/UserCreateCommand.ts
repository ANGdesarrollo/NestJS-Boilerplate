import Command from '../../../Shared/Cqrs/Command';
import { CreateUserPayload } from '../../Domain/Payloads/CreateUserPayload';

export class UserCreateCommand extends Command<CreateUserPayload> {}
