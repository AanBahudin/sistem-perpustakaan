const oneDay = 1000 * 60 * 60 * 24

export const cookieConfiguration = {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production'
}