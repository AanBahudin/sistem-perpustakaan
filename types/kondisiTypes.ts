export type BuatKondisiParamsType = {
    kondisi: string,
    denda: number,
    userId: string
}

export type GetOneKondisiParamsType = {
    kondisiId: string
}

export type EditKondisiParamsType = {
    kondisiId: string,
    kondisi: string,
    denda: number
}

export type HapusKondisiParamsType = {
    kondisiId: string
}