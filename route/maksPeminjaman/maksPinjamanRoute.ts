import express from 'express'
import { getMaksPinjaman, updateMaksPinjaman } from '../../controllers/maksPeminjaman/maksPeminjamanController'
import { pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'
import { updateMaksPinjamanValidator } from '../../validator/maksPeminjamanValidator'

const router = express.Router()

router.route('/')
    .get(getMaksPinjaman)

router.route('/:id')
    .patch(pustakawanMiddlewareAuthorized, updateMaksPinjamanValidator, updateMaksPinjaman)

export default router