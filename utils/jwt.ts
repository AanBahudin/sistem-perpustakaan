import jwt from 'jsonwebtoken'
import { BadRequestError, NotAuthorized } from '../errors/errorHandler'
import { JwtVerifiedToken } from '../types/jwtTypes'

export const generateToken = (payload : {}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1d'})
    return token
}

export const decodeToken = (token: string) => {
    const isTokenCorrect = jwt.decode(token, )
    if (!isTokenCorrect) {
        throw new BadRequestError('Something is wrong')
    };
    
    return isTokenCorrect
}

export const verifyToken = (token: string) : JwtVerifiedToken => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtVerifiedToken
    return decodedToken
}