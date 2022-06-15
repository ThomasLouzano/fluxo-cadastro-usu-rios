import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/PostgresUsersrepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgresUserRepository = new PostgresUsersRepository()
const mailTrapMailProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUseCase(

  postgresUserRepository,
  mailTrapMailProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase,
)

export { createUserUseCase, createUserController }