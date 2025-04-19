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
    statusPengembalian: string
}

export type PustakawanAcceptPengembalianParamsType = {
    idPengembalian: string,
    userId: string
}

export type PustakawanEditPengembalianParamsType = {
    kondisiBuku: string,
    idPengembalian: string
}