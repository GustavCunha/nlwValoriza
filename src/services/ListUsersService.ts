import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { classToPlain } from "class-transformer";

class ListUserService {
  async execute() {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUserService };