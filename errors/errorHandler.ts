import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (err : any, req : Request, res : Response, next: NextFunction) => {

    console.log(err.stack)

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message || 'Something is wrong'
    const timestamps = err.timestamps || new Date().toISOString()

    res.status(statusCode).json({
        status: statusCode,
        message,
        timestamps
    })
}

export class NotFoundError extends Error {
    statusCode : number;
    timestamps: string;

    constructor(message : string) {
        super(message)
        this.message = message
        this.timestamps = new Date().toISOString()
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export class BadRequestError extends Error {
    statusCode: number;
    timestamps: string

    constructor(message : string) {
        super(message)
        this.message = message
        this.timestamps = new Date().toISOString()
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class NotAuthenticated extends Error {
    statusCode: number;
    timestamps: string;

    constructor(message: string) {
        super(message)
        this.message = message
        this.timestamps = new Date().toISOString()
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export class NotAuthorized extends Error {
    statusCode: number;
    timestamps: string;

    constructor(message: string) {
        super(message)
        this.message = message
        this.timestamps = new Date().toISOString()
        this.statusCode = StatusCodes.FORBIDDEN
    }
}