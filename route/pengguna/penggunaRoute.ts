import express from 'express'
import { getProfile, updateProfile, updateEmail, updatePassword } from '../../controllers/pengguna/penggunaController'
import { validateUpdateEmailPengguna, validateUpdateInputPengguna, validateUpdatePasswordPengguna } from '../../validator/penggunaValidator'
import { UpdateEmailPermissionMiddleware } from '../../middleware/utilsMiddleware'
import { userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()

router.route('/profile')
    .get(getProfile)

router.route('/update/profil')
    .patch(userMiddlewareAuthorized, validateUpdateInputPengguna, updateProfile)

router.route('/update/password')
    .patch(userMiddlewareAuthorized, validateUpdatePasswordPengguna, updatePassword)

router.route('/update/email')
    .patch(userMiddlewareAuthorized, UpdateEmailPermissionMiddleware, validateUpdateEmailPengguna, updateEmail)

export default router