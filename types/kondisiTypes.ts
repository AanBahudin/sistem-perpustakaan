export type BuatKondisiParamsType = {
    kondisi: string,
    denda: number,
    deskripsi: string,
    userId: string
}

export type GetOneKondisiParamsType = {
    kondisiId: string
}

export type EditKondisiParamsType = {
    kondisiId: string,
    kondisi: string,
    deskripsi: string,
    denda: number
}

export type HapusKondisiParamsType = {
    kondisiId: string
}