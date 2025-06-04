import express from 'express'
import { getProfile, updateProfile, updateEmail, updatePassword, updatePhoto, getStats } from '../../controllers/pengguna/penggunaController'
import { validateUpdateEmailPengguna, validateUpdateInputPengguna, validateUpdatePasswordPengguna, validateUpdatePhoto } from '../../validator/penggunaValidator'
import { UpdateEmailPermissionMiddleware } from '../../middleware/utilsMiddleware'
import { userMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import upload from '../../middleware/multerMiddleware'

const router = express.Router()

router.route('/profile')
    .get(userMiddlewareAuthorized, getProfile)

router.route('/profile/stats')
    .get(userMiddlewareAuthorized, getStats)

router.route('/update/profil')
    .patch(userMiddlewareAuthorized, validateUpdateInputPengguna, updateProfile)

router.route('/update/photo')
    .patch(userMiddlewareAuthorized, upload.single('fotoProfil'), updatePhoto)

router.route('/update/password')
    .patch(userMiddlewareAuthorized, validateUpdatePasswordPengguna, updatePassword)

router.route('/update/email')
    .patch(userMiddlewareAuthorized, UpdateEmailPermissionMiddleware, validateUpdateEmailPengguna, updateEmail)

export default router