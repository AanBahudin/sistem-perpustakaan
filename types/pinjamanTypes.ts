export type PinjamanDikembalikanParamsType = {
    idPeminjaman: string,
    idPeminjam: string,
    idBuku: string
}

export type PinjamanUpdatedFieldType = {
    statusPeminjaman: string,
    diprosesOleh: string,
    disetujui: boolean,
    berakhirPada?: Date
}