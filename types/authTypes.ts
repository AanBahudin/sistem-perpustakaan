export type LoginInputBody = {
    email: string
    password: string
}

export type RegisterInputBody = {
    nama: string
    email: string
    nim: string
    password: string
    role: 'Mahasiswa' | 'Dosen'
}