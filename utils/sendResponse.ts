import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface SendResponseParamsInterface {
    res: Response,
    status?: number,
    message?: string,
    timestamps?: string,
    data?: any,
    total?: number,
    page?: number,
    durasi?: any,
    token?: string,
    tokenName?: string,
    expires?: Date
    pageName?: string,
    pageData?: {
        name?: string
    }
}

interface SendPageResponse {
    res: Response,
    pageName: string,
    pageData?: Record<string, any>
}

export const SendBasicResponse = ({
    res, 
    status = StatusCodes.OK,
    message,
    timestamps = new Date(Date.now()).toString()
} : SendResponseParamsInterface) => {
    return res.status(StatusCodes.OK).json({
        status,
        message,
        timestamps
    })
}

export const SendOneDataResponse = ({
    res,
    status = StatusCodes.OK,
    message,
    timestamps =  new Date(Date.now()).toString(),
    data,
} : SendResponseParamsInterface) => {
    return res.status(status).json({
        status,
        message,
        timestamps,
        data: data,
    })
}

export const SendDataWithDurasiResponse = ({
    res,
    status = StatusCodes.OK,
    message,
    timestamps =  new Date(Date.now()).toString(),
    data,
    durasi
} : SendResponseParamsInterface) => {
    return res.status(status).json({
        status,
        message,
        timestamps,
        data: data ?? null,
        durasi
    })
}

export const SendDataResponse = ({
    res,
    status = StatusCodes.OK,
    message,
    timestamps =  new Date(Date.now()).toString(),
    data,
    total,
    page,
} : SendResponseParamsInterface ) => {
    return res.status(status).json({
        status,
        message,
        timestamps,
        total,
        page,
        data,
    })
}

export const sendResponseWithToken = ({
    res,
    status = StatusCodes.OK,
    message,
    timestamps = new Date(Date.now()).toString(),
    token,
    tokenName,
    expires = new Date(Date.now() + 1000 * 60 * 60 * 24)
} : SendResponseParamsInterface ) => {
    return res.cookie(tokenName as string, token, {
        httpOnly: true,
        expires: expires,
        secure: process.env.NODE_ENV === 'production'
    }).status(StatusCodes.OK).json({
        status,
        message,
        timestamps,
    })
}

export const sendResponseWithPage = ({
    res,
    pageName,
    pageData
} : SendPageResponse) => {
    res.render(pageName as string, pageData)
}