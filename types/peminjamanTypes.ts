export type PengajuanPeminjamanParamsType = {
    idBuku: string,
    durasiPeminjaman: number,
    userId: string
}

export type GetSemuaPeminjamanUserParamsType = {
    userId: string
}

export type GetOnePeminjamanUser = {
    userId: string,
    peminjamanId: string
}

export type PembatalanPeminjamanUserParamsType = {
    idPeminjaman: string,
    userId: string
}

export type TerimaPeminjamanUserParamsType = {
    userId: string,
    idPeminjaman: string,
    statusPeminjaman: boolean,
    kondisiBuku: string
}

export type TambahPeminjamanParamsType = {
    idBuku: string,
    idPengguna: string,
    durasiPeminjaman: number,
    kondisi: string,
    userId: string
}

export type GetOnePeminjamanParamsType = {
    idPeminjaman: string
}



export type PinjamanDikembalikanParamsType = {
    idPeminjaman: string,
    idPeminjam: string,
    idBuku: string
}

export type PinjamanUpdatedFieldType = {
    statusPeminjaman: string,
    diprosesOleh: string,
    disetujui: boolean,
    kondisi: string,
    berakhirPada?: Date
}