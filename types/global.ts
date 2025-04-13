import { Request, Response } from "express"

export type ControllerParams = {
    req: Request | any,
    res: Response
}