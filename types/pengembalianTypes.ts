import { ObjectId } from "mongoose"

export type GetAllPengembalianDataParamsType = {
    userId: string
}

export type GetOnePengembalianDataParamsType = {
    userId: string,
    pengembalianId: string | ObjectId
}

export type PustakawanGetOnePengembalianParamsType = {
    pengembalianId: string | ObjectId
}

export type PustakawanCreatePengembalianParamsType = {
    idPeminjaman: string,
    kondisiBuku: string,
    statusHilang: boolean,
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