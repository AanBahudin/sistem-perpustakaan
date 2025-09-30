export interface JwtVerifiedToken {
    userId: string
    role: 'Mahasiswa' |  'Dosen' | 'Pustakawan' | 'Prodi'
    email: string
    iat?: number,
    exp?: number
}