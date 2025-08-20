import { ObjectId } from "mongoose"

export type GetAllPengembalianDataParamsType = {
    userId: string,
    query?: any
}

export type GetOnePengembalianDataParamsType = {
    userId: string,
    pengembalianId: string | ObjectId
}

export type UserCreatePengembalianDataType = {
    peminjamanId: string | ObjectId,
    userId: string
}

export type PustakawanGetOnePengembalianParamsType = {
    pengembalianId: string | ObjectId
}

export type PustakawanCreatePengembalianParamsType = {
    dataBody: any
}

export type PustakawanAcceptPengembalianParamsType = {
    idPengembalian: string,
    userId: string
}

export type PustakawanEditPengembalianParamsType = {
    statusHilang: boolean
    kondisiBuku: string,
    idPengembalian: string
}