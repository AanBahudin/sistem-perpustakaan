import express from 'express'
const route = express.Router()
import { login, prodiLogin, pustakawanLogin, register, verifyEmail, verifyEmailUpdate, logout, verifyPustakawanEmail } from '../../controllers/auth/authController'
import { loginInputValidator, registerInputValidator } from '../../validator/authValidation'
import { adminLoginValidator } from '../../validator/adminValidators'
import { pustakawanLoginValidator } from '../../validator/pustakawanValidator'


route.route('/login/prodi')
    .post(adminLoginValidator, prodiLogin)

route.route('/login/pustakawan')
    .post(pustakawanLoginValidator, pustakawanLogin)

route.route('/login')
    .post(loginInputValidator, login)

route.route('/register')
    .post(registerInputValidator, register)

route.route('/logout')
    .get(logout)

route.route('/verify/account')
    .get(verifyEmail)

route.route('/verify/email')
    .get(verifyEmailUpdate)

route.route('/verify/pustakawan/account')
    .get(verifyPustakawanEmail)

export default route
