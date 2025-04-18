export interface CreateAdminParamsType {
    nama: string,
    email: string,
    password: string
}

export interface CreatePustakawanParamsType {
    nama: string,
    email: string,
    password: string,
    adminId: string,
    no_hp?: string
}

export interface GetProdiProfileParamsType {
    prodiId: string
}

export interface GetOnePustakawanDataParamsType {
    pustakawanId: string
}

export interface GetOnePenggunaDataParamsType {
    penggunaId: string
}

export interface GetOneRequestedPenggunaParamsType {
    penggunaId: string
}

export interface VerifyRegisteredAccountParamsType {
    userId: string
}