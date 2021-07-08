import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export async function ensureAdmin(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const {user_id} = req;

    const usersRepository = getCustomRepository(UserRepository);

    const {admin} = await usersRepository.findOne(user_id);
    
    // Verificar se o usuário é Admin
    if(admin) {
        return next();
    }

    return res.status(401).json({
        error: "Unauthorized",
    });
}