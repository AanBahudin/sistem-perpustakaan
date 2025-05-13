import express from 'express'
import { getProfile, updateProfile, updateEmail, updatePassword, updatePhoto } from '../../controllers/pengguna/penggunaController'
import { validateUpdateEmailPengguna, validateUpdateInputPengguna, validateUpdatePasswordPengguna, validateUpdatePhoto } from '../../validator/penggunaValidator'
import { UpdateEmailPermissionMiddleware } from '../../middleware/utilsMiddleware'
import { userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import upload from '../../middleware/multerMiddleware'

const router = express.Router()

router.route('/profile')
    .get(getProfile)

router.route('/update/profil')
    .patch(userMiddlewareAuthorized, validateUpdateInputPengguna, updateProfile)

router.route('/update/photo')
    .patch(userMiddlewareAuthorized, validateUpdatePhoto, upload.single('fotoProfil'), updatePhoto)

router.route('/update/password')
    .patch(userMiddlewareAuthorized, validateUpdatePasswordPengguna, updatePassword)

router.route('/update/email')
    .patch(userMiddlewareAuthorized, UpdateEmailPermissionMiddleware, validateUpdateEmailPengguna, updateEmail)

export default router