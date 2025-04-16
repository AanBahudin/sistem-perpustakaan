import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface SendResponseParamsInterface {
    res: Response,
    status?: number,
    message: string,
    timestamps?: string,
    data?: any,
    total?: number,
    page?: number,
    durasi?: any
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
        data: data ?? null,
    })
}

export const SendOneDataResponseWithDuration = ({
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