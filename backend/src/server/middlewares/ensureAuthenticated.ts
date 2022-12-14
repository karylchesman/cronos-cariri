import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { TokenGender } from "../../domain/utils/token-gender";
import { SessionJwtPayload } from "../types/session-jwt-payload";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authtoken = request.headers.authorization;
    if (!authtoken) {
        return response.status(401).json({ message: "Token missing." });
    }
    
    const [, token] = authtoken.split(" ");
    
    try {
        const decode = <SessionJwtPayload>verify(token, String(process.env.APP_SECRET));

        request.body["token_user_id"] = decode["user_id"];

        const newToken = TokenGender.getSessionToken({
            user_id: request.body.token_user_id
        })

        response.setHeader('x-new-token', JSON.stringify(newToken));

        return next();
    } catch (err) {
        console.log(err)
        return response.status(401).send("Sessão expirada, faça login novamente.").end();
    }

}