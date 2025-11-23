import express from 'express'
import { kategoriInputValidator } from '../../validator/kategoriValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { createKategori, editKategori, getAllKategori, getSearchKategori, hapusKategori } from '../../controllers/kategori/kategoriController'
import { pustakawanMiddlewareAuthorized } from '../../middleware/roleBasedMiddleware'

const router = express.Router()
 
router.route('/')
    .get(getAllKategori)
    .post(pustakawanMiddlewareAuthorized, kategoriInputValidator, createKategori)

router.route('/search')
    .get(getSearchKategori)

router.route('/:id')
    .patch(pustakawanMiddlewareAuthorized, kategoriInputValidator, editKategori)
    .delete(mongooseIdMiddleware, pustakawanMiddlewareAuthorized, hapusKategori)


export default router