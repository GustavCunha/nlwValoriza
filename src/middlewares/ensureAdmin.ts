import { NextFunction, Request, Response } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    
    // Verificar se o usuário é Admin
    const admin = true;

    if(admin) {
        return next();
    }

    return res.status(401).json({
        error: "Unauthorized",
    });
}