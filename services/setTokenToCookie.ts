import { Response } from 'express';

export const attachTokenToCookie = (
    res: Response,
    token: string,
    tokenName: string = 'token', // default jika tidak dikirim
    expiresInMs: number = 1000 * 60 * 60 * 24 * 7 // default 7 hari
) => {
    const expiresAt = new Date(Date.now() + expiresInMs);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // optional tapi bagus untuk keamanan CSRF
        expires: expiresAt
    });
};