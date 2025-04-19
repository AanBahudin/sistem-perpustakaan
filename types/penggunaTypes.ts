export type UpdatePasswordParamsServicesType = {
    userId: string, 
    newPassword: string, 
    oldPassword: string
}

export type UpdateEmailParamsServicesType = {
    userId: string,
    newEmail: string
}

export type UpdateProfilParamsServicesType = {
    userId: string,
    dataUpdate: {
        kelas: string,
        no_hp: string
    }
}

export type GetProfileParamsServiceType = {
    userId: string
}

export type PenggunaMeminjamParamsType = {
    idPengguna: string
}