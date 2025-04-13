import express from 'express'
import { getProfile, updateProfile, updateEmail } from '../../controllers/pengguna/penggunaController'
import { validateUpdateEmailPengguna, validateUpdateInputPengguna } from '../../validator/penggunaValidators'
import { UpdateEmailPermissionMiddleware } from '../../middleware/utilsMiddleware'

const router = express.Router()

router.route('/profile')
    .get(getProfile)

router.route('/update/profil')
    .patch(validateUpdateInputPengguna, updateProfile)

router.route('/update/email')
    .patch(UpdateEmailPermissionMiddleware, validateUpdateEmailPengguna, updateEmail)

export default router