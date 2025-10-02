import sendVerficationEmail from "../utils/emailVerification"

type SendVerifyAndAuthDataPustakawan = {
    emailPustakawan: string,
    passwordPustakawan: string,
    namaPustakawan: string
}

const sendVerifyAndAuthDataPustakawan = async({emailPustakawan, passwordPustakawan, namaPustakawan} : SendVerifyAndAuthDataPustakawan) => {
    await sendVerficationEmail({
        templateName: 'pustakawanAuthDataEmail',
        subject: 'Data Login Perpustakaan',
        to: emailPustakawan,
        emailData: {
            name: namaPustakawan,
            email: emailPustakawan,
            password: passwordPustakawan
        }
    })
}

export default sendVerifyAndAuthDataPustakawan