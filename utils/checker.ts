import mongoose from "mongoose";
import { BadRequestError } from "../errors/errorHandler";

export const isValidMongooseId = (objectId: string) : Boolean => {
    const isValidId = mongoose.Types.ObjectId.isValid(objectId)

    if (!isValidId) {
        throw new BadRequestError('Id tidak valid')
    }

    return isValidId
}