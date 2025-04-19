import { generateToken } from "../utils/jwt"
import generateVerificationLink from "../utils/generateVerificationLink"
import sendVerficationEmail from "../utils/emailVerification"
import { DataVerifyEmailUpdateType } from "../types/authTypes"

type sendUpdateEmailVerificationParamsType = {
    userId: string,
    nama: string,
    oldEmail: string,
    newEmail: string
}

const sendUpdateEmailVerification = async({userId, nama, oldEmail, newEmail} : sendUpdateEmailVerificationParamsType) => {
    console.log(newEmail)
    const token = generateToken({userId, newEmail, oldEmail} as DataVerifyEmailUpdateType)
    const linkVerifikasi = generateVerificationLink({ credentialName: 'token', url: '/verify/email', credentials: token })

    await sendVerficationEmail({
        templateName: 'konfirmasiUpdateEmail',
        subject: 'Konfirmasi Perubahan Akun Email',
        to: newEmail,
            emailData: {
                name: nama,
                verficationLink: linkVerifikasi
            }
    })
}

export default sendUpdateEmailVerification