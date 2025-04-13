import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotAuthorized, NotFoundError } from "../errors/errorHandler";
import { verifyToken } from "../utils/jwt";
import { JwtVerifiedToken } from "../types/jwtTypes";

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies

    if (!token) {
        throw new NotFoundError('Halaman tidak tersedia')
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