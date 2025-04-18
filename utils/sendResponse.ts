import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SendManyDataResponseType, SendPageResponseType, SendResponseType, SendResponseWithToken } from "../types/sendResponseType";


export const SendBasicResponse = ({
    res, 
    status = StatusCodes.OK,
    message,
    timestamps = new Date(Date.now()).toString()
} : SendResponseType) => {
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
} : SendResponseType) => {
    return res.status(status).json({
        status,
        message,
        timestamps,
        data,
    })
}

export const SendDataWithDurasiResponse = ({
    res,
    status = StatusCodes.OK,
    message,
    timestamps =  new Date(Date.now()).toString(),
    data,
    durasi
} : SendManyDataResponseType) => {
    return res.status(status).json({
        status,
        message,
        timestamps,
        data,
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
} : SendManyDataResponseType ) => {
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
} : SendResponseWithToken ) => {
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
} : SendPageResponseType) => {
    res.render(pageName as string, pageData)
}