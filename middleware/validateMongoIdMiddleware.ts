import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/errorHandler";

const mongooseIdMiddleware = (req : Request, res: Response, next: NextFunction) => {
    const {id: mongoId} = req.params

    const isValidId = mongoose.Types.ObjectId.isValid(mongoId)

    if (!isValidId) {
        throw new BadRequestError('Not a valid Id')
    }

    next()
}

export default mongooseIdMiddleware