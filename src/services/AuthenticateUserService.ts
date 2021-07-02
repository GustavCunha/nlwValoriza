import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password} : IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UserRepository);

        // Verificar se email existe
        const user = await usersRepository.findOne({
            email,
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        // verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // Gerar Token
        const token = sign(
            {
                email: user.email
            }, 
            "0038dae702ddf52e0c1511e7ce7ac52e", 
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );
        
        return token;
    }
}

export {AuthenticateUserService};