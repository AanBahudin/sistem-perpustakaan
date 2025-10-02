import { Response } from "express"

export type TokenType = {
    userId: string,
    email: string,
    role: string
}

export type LoginInputBody = {
    email: string
    password: string
}

export type RegisterInputBody = {
    nama: string
    email: string
    nim: string
    password: string
    role: 'Mahasiswa' | 'Dosen'
}

export type LoginServicesParamsType = {
    email: string,
    password: string
}

export type RegisterUserServicesParamsType = {
    nama: string,
    email: string,
    idKampus: string,
    password: string,
    role: "Mahasiswa" | "Dosen"
}

export type VerifyServicesParamsType = {
    token: string | null,
    res: Response
}

export type DataVerifyAccountTokenType = {
    userId: string
}

export type DataVerifyEmailUpdateType = {
    userId: string,
    newEmail: string,
    oldEmail: string
}

export type DataAuthPustakawanType = {
    pustakawanId: string,
    email: string,
    password: string
}