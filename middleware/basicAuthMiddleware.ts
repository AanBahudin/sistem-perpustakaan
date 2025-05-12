import { NextFunction, Request, Response } from "express"

export const basedAuthMiddleware = (req: Request, res: Response, next: NextFunction) : void | Promise<void>=> {
    const { token } = req.cookies

    if (token) {
        next()
    }

    return
}