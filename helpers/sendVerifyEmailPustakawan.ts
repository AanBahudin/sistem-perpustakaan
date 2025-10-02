import sendVerficationEmail from "../utils/emailVerification"
import generateVerificationLink from "../utils/generateVerificationLink"
import { generateToken } from "../utils/jwt"

type SendVeriifyEmailPustakawanParamsType = {
    pustakawanId: string,
    nama: string,
    email: string,
    password: string
}

const sendVerifyEmailPustakawan = async({pustakawanId, nama, email, password} : SendVeriifyEmailPustakawanParamsType) => {
    const token = generateToken({pustakawanId, email, password})
    const linkVerifikasi = generateVerificationLink({
        credentialName: 'token', 
        credentials: token, 
        url: '/verify/pustakawan/account'
    })

    await sendVerficationEmail({
        templateName: 'konfirmasiEmailPustakawan',
        subject: 'Verifikasi Email Pustakawan',
        to: email,
        emailData: {
            verficationLink: linkVerifikasi,
            name: nama
        }
    })
}

export default sendVerifyEmailPustakawan