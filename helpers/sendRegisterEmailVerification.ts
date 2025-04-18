import Pengguna from "../model/Pengguna"
import sendVerficationEmail from "../utils/emailVerification"
import generateVerificationLink from "../utils/generateVerificationLink"
import { generateToken } from "../utils/jwt"

type SendRegisterEmailVerificationParamsType = {
    userId: string,
    nama: string,
    email: string
}

const sendRegisterEmailVerification = async({userId, nama, email} : SendRegisterEmailVerificationParamsType) => {
    const token = generateToken({userId})
    const linkVerifikasi = generateVerificationLink({credentialName: 'token', credentials: token, url:'/verify/account'})

    // send email
    await sendVerficationEmail({
        templateName: 'mail',
        subject: "Selamat Bergabung, Silahkan Verifikasi Akun Anda",
        to: email, 
        emailData: {
            name: nama, 
            verficationLink: linkVerifikasi
        }
    })
}

export default sendRegisterEmailVerification