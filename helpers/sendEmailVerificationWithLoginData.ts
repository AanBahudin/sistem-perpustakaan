import sendVerficationEmail from "../utils/emailVerification";
import generateVerificationLink from "../utils/generateVerificationLink";
import { generateToken } from "../utils/jwt";


const sendEmailVerificationWithLoginData = async(dataPengguna : any) => {
    const { id, email, password, nama } = dataPengguna 
    
    const token = generateToken({id, email})
    const linkVerifikasi = generateVerificationLink({credentialName: 'token', credentials: token, url:'/verify/registered/email'})

    await sendVerficationEmail({
        templateName: 'verifikasiEmailDenganLoginData',
        subject: 'Selamat Datang, Akun anda berhasil didaftarkan sebagai pengguna Perpustakaan Teknik Informatika oleh Program Studi!',
        to: email,
        emailData: {
            verificationLink: linkVerifikasi,
            ...dataPengguna
        }
    })
}

export default sendEmailVerificationWithLoginData