import express from 'express'
import { getProfile, updateProfile, updateEmail, updatePassword } from '../../controllers/pengguna/penggunaController'
import { validateUpdateEmailPengguna, validateUpdateInputPengguna, validateUpdatePasswordPengguna } from '../../validator/penggunaValidator'
import { UpdateEmailPermissionMiddleware } from '../../middleware/utilsMiddleware'

const router = express.Router()

router.route('/profile')
    .get(getProfile)

router.route('/update/profil')
    .patch(validateUpdateInputPengguna, updateProfile)

router.route('/update/password')
    .patch(validateUpdatePasswordPengguna, updatePassword)

router.route('/update/email')
    .patch(UpdateEmailPermissionMiddleware, validateUpdateEmailPengguna, updateEmail)

export default router