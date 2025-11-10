import { NextFunction, Request, Response } from "express";
import { NotAuthenticated, NotAuthorized, NotFoundError } from "../errors/errorHandler";
import { verifyToken } from "../utils/jwt";
import { JwtVerifiedToken } from "../types/jwtTypes";

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) : void | Promise<void>=> {
    const { token } = req.cookies

    if (!token) {
        throw new NotAuthenticated('Pengguna belum login')
    }

    try {
        const isVerify = verifyToken(token) as JwtVerifiedToken
        (req as any).user = { ...isVerify }
        next()
    } catch (error) {
        throw new NotAuthorized('Terjadi kesalahan, coba lagi nanti!')  
    }
}

export default authenticationMiddleware