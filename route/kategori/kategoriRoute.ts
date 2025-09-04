import express from 'express'
import { kategoriInputValidator } from '../../validator/kategoriValidator'
import mongooseIdMiddleware from '../../middleware/validateMongoIdMiddleware'
import { createKategori, editKategori, getAllKategori, getSearchKategori, hapusKategori } from '../../controllers/kategori/kategoriController'

const router = express.Router()
 
router.route('/')
    .get(getAllKategori)
    .post(kategoriInputValidator, createKategori)

router.route('/search')
    .get(getSearchKategori)

router.route('/:id')
    .patch(kategoriInputValidator, editKategori)
    .delete(mongooseIdMiddleware, hapusKategori)


export default router