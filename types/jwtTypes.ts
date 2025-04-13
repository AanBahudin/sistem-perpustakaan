export interface JwtVerifiedToken {
    userId: string
    role: 'Mahasiswa' |  'Dosen' | 'Librarian' | 'Prodi'
    email: string
    iat?: number,
    exp?: number
}