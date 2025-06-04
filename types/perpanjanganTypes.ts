export type TambahPerpanjanganParamsType = {
    userId: string,
    dataPerpanjangan: {
        idPeminjaman: string,
        idBuku: string,
        durasi: number,
        alasan: string
    }
}

export type GetSemauPerpanjanganParamsType = {
    userId: string,
    query?: any
}

export type GetOnePerpanjanganParamsType = {
    idPerpanjangan: string,
    userId: string
}

export type UpdatePerpanjanganParamsType = {
    idPerpanjangan: string,
    userId: string,
    dataPerpanjangan: {
        durasi: number,
        alasan: string
    }
}

export type PembatalanPerpanjanganParamsType = {
    userId: string,
    idPerpanjangan: string
}

export type GetOnePerpanjanganUserParamsType = {
    idPerpanjangan: string
}

export type AcceptPerpanjanganParamsType = {
    userId: string,
    dataPerpanjangan: {
        idPerpanjangan: string,
        disetujui: boolean
    }
}

export type PenambahanPerpanjanganParamsType = {
    idPerpanjangan: string,
    userId: string
}

export type PerpanjanganDitolakParamsType = {
    idPerpanjangan: string,
    userId: string
}