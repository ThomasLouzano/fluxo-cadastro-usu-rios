import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,   
  ) {}
  
  
  async execute(data: ICreateUserRequestDTO){
    const UserAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(UserAlreadyExists) {
      throw new Error('Esse usuário já existe.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Plin Condomínios',
        email: 'cadastro@plincondominios.com.br',
      },
      subject: 'Seja bem-vindo',
      body: '<p>Faça seu login na plataforma Plin</p>'
    }) 
  }
}