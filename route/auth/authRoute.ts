import express from 'express'
const route = express.Router()
import { login, prodiLogin, pustakawanLogin, register, verifyEmail, verifyEmailUpdate, logout, verifyPustakawanEmail } from '../../controllers/auth/authController'
import { loginInputValidator, registerInputValidator } from '../../validator/authValidator'

route.route('/register')
    .post(registerInputValidator, register)

route.route('/login')
    .post(loginInputValidator, login)

route.route('/login/prodi')
    .post(loginInputValidator, prodiLogin)

route.route('/login/pustakawan')
    .post(loginInputValidator, pustakawanLogin)

route.route('/logout')
    .get(logout)


    
route.route('/verify/account')
    .get(verifyEmail)

route.route('/verify/email')
    .get(verifyEmailUpdate)

route.route('/verify/pustakawan/account')
    .get(verifyPustakawanEmail)

export default route
