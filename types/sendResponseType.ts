import { Response } from "express"

export interface SendResponseType {
    res: Response,
    message: string,
    timestamps?: string,
    status?: number
    data?: any,
}

export interface SendManyDataResponseType {
    res: Response,
    status?: number
    message: string,
    timestamps?: string,
    total?: number,
    page?: number
    data: any
    durasi?: any
}

export interface SendResponseWithToken {
    res: Response,
    status?: number,
    timestamps?: string,
    expires?: Date,
    message: string,
    tokenName: string,
    token: string
}

export interface SendPageResponseType {
    res: Response,
    pageName: string,
    pageData?: Record<string, any>
}